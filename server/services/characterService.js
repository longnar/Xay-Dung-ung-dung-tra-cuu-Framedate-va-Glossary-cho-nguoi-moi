const db = require('../repositories/characterRepository');
const fs = require('fs');
const path = require('path');

/**
 * Helper to delete a file in the uploads folder
 */
const deleteUploadedFile = (relativeUrl) => {
    if (!relativeUrl) return;
    
    // Convert relative URL "/uploads/filename.ext" to absolute disk path
    const filename = relativeUrl.replace(/^\/uploads\//, '');
    const filepath = path.join(__dirname, '../../uploads', filename);
    
    fs.unlink(filepath, (err) => {
        if (err) {
            // Log warning but don't crash, the database update is the priority
            console.warn(`[Warning] Could not delete file at ${filepath}:`, err.message);
        } else {
            console.log(`[Info] Successfully deleted unused file: ${filepath}`);
        }
    });
};

/**
 * GET list of all characters
 * GET /api/characters
 */
exports.getAllCharacters = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM characters ORDER BY name ASC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error in getAllCharacters:', error);
        return res.status(500).json({ message: 'Failed to retrieve characters list.' });
    }
};

/**
 * GET details of a single character by ID
 * GET /api/characters/:id
 */
exports.getCharacterById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM characters WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Character not found.' });
        }
        const [moves, baseStats] = await Promise.all([
            db.execute('SELECT * FROM character_moves WHERE character_id = ? ORDER BY id ASC', [id]),
            db.execute('SELECT * FROM character_base_stats WHERE character_id = ?', [id])
        ]);
        return res.status(200).json({
            ...rows[0],
            moves: moves[0],
            base_stats: baseStats[0][0] || null
        });
    } catch (error) {
        console.error('Error in getCharacterById:', error);
        return res.status(500).json({ message: 'Failed to retrieve character details.' });
    }
};

/**
 * POST create a new character
 * POST /api/admin/characters (Admin only, upload image supported)
 */
exports.createCharacter = async (req, res) => {
    const { name, debut_date, description, difficulty, type } = req.body;

    if (!name) {
        // Clean up file if uploaded but validation failed
        if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
        return res.status(400).json({ message: 'Character name is required.' });
    }

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const [result] = await db.execute(
            `INSERT INTO characters (name, debut_date, description, difficulty, type, image_url) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                debut_date || null,
                description || null,
                difficulty ? parseInt(difficulty, 10) : 1,
                type || null,
                image_url
            ]
        );

        return res.status(201).json({
            message: 'Character created successfully.',
            character: {
                id: result.insertId,
                name,
                debut_date: debut_date || null,
                description: description || null,
                difficulty: difficulty ? parseInt(difficulty, 10) : 1,
                type: type || null,
                image_url
            }
        });
    } catch (error) {
        console.error('Error in createCharacter:', error);
        // Clean up uploaded file on server error
        if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
        return res.status(500).json({ message: 'Failed to create character.' });
    }
};

/**
 * PUT update a character details
 * PUT /api/admin/characters/:id (Admin only, optional upload image)
 */
exports.updateCharacter = async (req, res) => {
    const { id } = req.params;
    const { name, debut_date, description, difficulty, type } = req.body;

    try {
        // Fetch existing record first
        const [rows] = await db.execute('SELECT * FROM characters WHERE id = ?', [id]);
        if (rows.length === 0) {
            if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
            return res.status(404).json({ message: 'Character not found.' });
        }

        const character = rows[0];
        let image_url = character.image_url;

        // If a new image was uploaded
        if (req.file) {
            // Delete old image if exists
            if (character.image_url) {
                deleteUploadedFile(character.image_url);
            }
            image_url = `/uploads/${req.file.filename}`;
        }

        // Prepare updated data
        const updatedName = name !== undefined ? name : character.name;
        const updatedDebut = debut_date !== undefined ? (debut_date || null) : character.debut_date;
        const updatedDesc = description !== undefined ? (description || null) : character.description;
        const updatedDiff = difficulty !== undefined ? parseInt(difficulty, 10) : character.difficulty;
        const updatedType = type !== undefined ? (type || null) : character.type;

        await db.execute(
            `UPDATE characters 
             SET name = ?, debut_date = ?, description = ?, difficulty = ?, type = ?, image_url = ?
             WHERE id = ?`,
            [updatedName, updatedDebut, updatedDesc, updatedDiff, updatedType, image_url, id]
        );

        return res.status(200).json({
            message: 'Character updated successfully.',
            character: {
                id: parseInt(id, 10),
                name: updatedName,
                debut_date: updatedDebut,
                description: updatedDesc,
                difficulty: updatedDiff,
                type: updatedType,
                image_url
            }
        });
    } catch (error) {
        console.error('Error in updateCharacter:', error);
        // Clean up file if uploaded but query failed
        if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
        return res.status(500).json({ message: 'Failed to update character.' });
    }
};

/**
 * DELETE a character
 * DELETE /api/admin/characters/:id (Admin only)
 */
exports.deleteCharacter = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch to check existence and retrieve image path
        const [rows] = await db.execute('SELECT image_url FROM characters WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Character not found.' });
        }

        const character = rows[0];

        // Delete from Database
        await db.execute('DELETE FROM characters WHERE id = ?', [id]);

        // Clean up image file on disk if it existed
        if (character.image_url) {
            deleteUploadedFile(character.image_url);
        }

        return res.status(200).json({ message: 'Character deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteCharacter:', error);
        return res.status(500).json({ message: 'Failed to delete character.' });
    }
};

const numericMoveFields = ['DAMAGE', 'START_UP', 'ACTIVE', 'RECOVERY', 'ADV_ON_BLOCK', 'ADV_ON_HIT'];
const numericBaseStatFields = ['HP', 'WALKSPEED', 'JUMP_START_UP', 'DASH_START_UP', 'BACKDASH'];

const parseOptionalInteger = (value, fieldName) => {
    if (value === undefined || value === null || value === '') return null;
    const parsed = Number(value);
    if (!Number.isInteger(parsed)) {
        const error = new Error(`${fieldName} must be an integer.`);
        error.statusCode = 400;
        throw error;
    }
    return parsed;
};

const characterExists = async (characterId) => {
    const [rows] = await db.execute('SELECT id FROM characters WHERE id = ?', [characterId]);
    return rows.length > 0;
};

exports.getCharacterMoves = async (req, res) => {
    try {
        if (!(await characterExists(req.params.id))) return res.status(404).json({ message: 'Character not found.' });
        const [rows] = await db.execute('SELECT * FROM character_moves WHERE character_id = ? ORDER BY id ASC', [req.params.id]);
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error in getCharacterMoves:', error);
        return res.status(500).json({ message: 'Failed to retrieve character moves.' });
    }
};

exports.getCharacterBaseStats = async (req, res) => {
    try {
        if (!(await characterExists(req.params.id))) return res.status(404).json({ message: 'Character not found.' });
        const [rows] = await db.execute('SELECT * FROM character_base_stats WHERE character_id = ?', [req.params.id]);
        return res.status(200).json(rows[0] || null);
    } catch (error) {
        console.error('Error in getCharacterBaseStats:', error);
        return res.status(500).json({ message: 'Failed to retrieve character base stats.' });
    }
};

exports.createCharacterMove = async (req, res) => {
    const { id } = req.params;
    const { CHAR_NAME, CHAR_MOVE, INVULNERABILITY } = req.body;
    if (!CHAR_NAME || !CHAR_MOVE) return res.status(400).json({ message: 'CHAR_NAME and CHAR_MOVE are required.' });
    try {
        if (!(await characterExists(id))) return res.status(404).json({ message: 'Character not found.' });
        const values = numericMoveFields.map((field) => parseOptionalInteger(req.body[field], field));
        const [result] = await db.execute(
            `INSERT INTO character_moves
            (character_id, CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, CHAR_NAME, CHAR_MOVE, ...values, INVULNERABILITY || null]
        );
        const [rows] = await db.execute('SELECT * FROM character_moves WHERE id = ?', [result.insertId]);
        return res.status(201).json({ message: 'Character move created successfully.', move: rows[0] });
    } catch (error) {
        console.error('Error in createCharacterMove:', error);
        return res.status(error.statusCode || 500).json({ message: error.statusCode ? error.message : 'Failed to create character move.' });
    }
};

exports.updateCharacterMove = async (req, res) => {
    const { id, moveId } = req.params;
    try {
        const [existingRows] = await db.execute('SELECT * FROM character_moves WHERE id = ? AND character_id = ?', [moveId, id]);
        if (existingRows.length === 0) return res.status(404).json({ message: 'Character move not found.' });
        const current = existingRows[0];
        const name = req.body.CHAR_NAME ?? current.CHAR_NAME;
        const move = req.body.CHAR_MOVE ?? current.CHAR_MOVE;
        const numericValues = numericMoveFields.map((field) => (
            req.body[field] === undefined ? current[field] : parseOptionalInteger(req.body[field], field)
        ));
        const vulnerability = req.body.INVULNERABILITY ?? current.INVULNERABILITY;
        await db.execute(
            `UPDATE character_moves SET CHAR_NAME = ?, CHAR_MOVE = ?, DAMAGE = ?, START_UP = ?,
            ACTIVE = ?, RECOVERY = ?, ADV_ON_BLOCK = ?, ADV_ON_HIT = ?, INVULNERABILITY = ?
            WHERE id = ? AND character_id = ?`,
            [name, move, ...numericValues, vulnerability, moveId, id]
        );
        const [rows] = await db.execute('SELECT * FROM character_moves WHERE id = ?', [moveId]);
        return res.status(200).json({ message: 'Character move updated successfully.', move: rows[0] });
    } catch (error) {
        console.error('Error in updateCharacterMove:', error);
        return res.status(error.statusCode || 500).json({ message: error.statusCode ? error.message : 'Failed to update character move.' });
    }
};

exports.deleteCharacterMove = async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM character_moves WHERE id = ? AND character_id = ?', [req.params.moveId, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Character move not found.' });
        return res.status(200).json({ message: 'Character move deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteCharacterMove:', error);
        return res.status(500).json({ message: 'Failed to delete character move.' });
    }
};

exports.upsertCharacterBaseStats = async (req, res) => {
    const { id } = req.params;
    try {
        if (!(await characterExists(id))) return res.status(404).json({ message: 'Character not found.' });
        const numericValues = numericBaseStatFields.map((field) => parseOptionalInteger(req.body[field], field));
        await db.execute(
            `INSERT INTO character_base_stats
            (character_id, HP, WALKSPEED, JUMP_START_UP, DASH_START_UP, BACKDASH, REVERSAL)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE HP = VALUES(HP), WALKSPEED = VALUES(WALKSPEED),
            JUMP_START_UP = VALUES(JUMP_START_UP), DASH_START_UP = VALUES(DASH_START_UP),
            BACKDASH = VALUES(BACKDASH), REVERSAL = VALUES(REVERSAL)`,
            [id, ...numericValues, req.body.REVERSAL || null]
        );
        const [rows] = await db.execute('SELECT * FROM character_base_stats WHERE character_id = ?', [id]);
        return res.status(200).json({ message: 'Character base stats saved successfully.', base_stats: rows[0] });
    } catch (error) {
        console.error('Error in upsertCharacterBaseStats:', error);
        return res.status(error.statusCode || 500).json({ message: error.statusCode ? error.message : 'Failed to save character base stats.' });
    }
};
