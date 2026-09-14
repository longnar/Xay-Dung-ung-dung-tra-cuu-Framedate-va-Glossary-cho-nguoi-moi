const db = require('../repositories/glossaryRepository');
const fs = require('fs');
const path = require('path');

/**
 * Helper to delete a file in the uploads folder
 */
const deleteUploadedFile = (relativeUrl) => {
    if (!relativeUrl) return;
    
    const filename = relativeUrl.replace(/^\/uploads\//, '');
    const filepath = path.join(__dirname, '../../uploads', filename);
    
    fs.unlink(filepath, (err) => {
        if (err) {
            console.warn(`[Warning] Could not delete file at ${filepath}:`, err.message);
        } else {
            console.log(`[Info] Successfully deleted unused file: ${filepath}`);
        }
    });
};

/**
 * GET list of all glossary terms
 * GET /api/glossaries
 */
exports.getAllGlossaries = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM glossaries ORDER BY term ASC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error in getAllGlossaries:', error);
        return res.status(500).json({ message: 'Failed to retrieve glossary list.' });
    }
};

/**
 * POST create a new glossary term
 * POST /api/admin/glossaries (Admin only, upload image supported)
 */
exports.createGlossary = async (req, res) => {
    const { term, definition, level, video_url } = req.body;

    if (!term || !definition) {
        if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
        return res.status(400).json({ message: 'Term and definition are required fields.' });
    }

    const glossaryLevel = level === 'advanced' ? 'advanced' : 'basic';
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // Validate uniqueness of term
        const [existing] = await db.execute('SELECT id FROM glossaries WHERE term = ?', [term]);
        if (existing.length > 0) {
            if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
            return res.status(400).json({ message: `The glossary term '${term}' already exists.` });
        }

        const [result] = await db.execute(
            `INSERT INTO glossaries (term, definition, level, image_url, video_url) 
             VALUES (?, ?, ?, ?, ?)`,
            [term, definition, glossaryLevel, image_url, video_url || null]
        );

        return res.status(201).json({
            message: 'Glossary term created successfully.',
            glossary: {
                id: result.insertId,
                term,
                definition,
                level: glossaryLevel,
                image_url,
                video_url: video_url || null
            }
        });
    } catch (error) {
        console.error('Error in createGlossary:', error);
        if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
        return res.status(500).json({ message: 'Failed to create glossary term.' });
    }
};

/**
 * PUT update a glossary term
 * PUT /api/admin/glossaries/:id (Admin only, optional upload image)
 */
exports.updateGlossary = async (req, res) => {
    const { id } = req.params;
    const { term, definition, level, video_url } = req.body;

    try {
        // Fetch existing record
        const [rows] = await db.execute('SELECT * FROM glossaries WHERE id = ?', [id]);
        if (rows.length === 0) {
            if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
            return res.status(404).json({ message: 'Glossary term not found.' });
        }

        const glossary = rows[0];
        let image_url = glossary.image_url;

        // If a new image was uploaded
        if (req.file) {
            if (glossary.image_url) {
                deleteUploadedFile(glossary.image_url);
            }
            image_url = `/uploads/${req.file.filename}`;
        }

        // Validate term uniqueness if user attempts to change it
        if (term && term !== glossary.term) {
            const [existing] = await db.execute('SELECT id FROM glossaries WHERE term = ? AND id != ?', [term, id]);
            if (existing.length > 0) {
                if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
                return res.status(400).json({ message: `The term '${term}' is already in use by another glossary entry.` });
            }
        }

        const updatedTerm = term !== undefined ? term : glossary.term;
        const updatedDefinition = definition !== undefined ? definition : glossary.definition;
        const updatedLevel = level !== undefined ? (level === 'advanced' ? 'advanced' : 'basic') : glossary.level;
        const updatedVideoUrl = video_url !== undefined ? (video_url || null) : glossary.video_url;

        await db.execute(
            `UPDATE glossaries 
             SET term = ?, definition = ?, level = ?, image_url = ?, video_url = ? 
             WHERE id = ?`,
            [updatedTerm, updatedDefinition, updatedLevel, image_url, updatedVideoUrl, id]
        );

        return res.status(200).json({
            message: 'Glossary term updated successfully.',
            glossary: {
                id: parseInt(id, 10),
                term: updatedTerm,
                definition: updatedDefinition,
                level: updatedLevel,
                image_url,
                video_url: updatedVideoUrl
            }
        });
    } catch (error) {
        console.error('Error in updateGlossary:', error);
        if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
        return res.status(500).json({ message: 'Failed to update glossary term.' });
    }
};

/**
 * DELETE a glossary term
 * DELETE /api/admin/glossaries/:id (Admin only)
 */
exports.deleteGlossary = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch to check existence and retrieve image path
        const [rows] = await db.execute('SELECT image_url FROM glossaries WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Glossary term not found.' });
        }

        const glossary = rows[0];

        // Delete from database
        await db.execute('DELETE FROM glossaries WHERE id = ?', [id]);

        // Clean up image file
        if (glossary.image_url) {
            deleteUploadedFile(glossary.image_url);
        }

        return res.status(200).json({ message: 'Glossary term deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteGlossary:', error);
        return res.status(500).json({ message: 'Failed to delete glossary term.' });
    }
};
