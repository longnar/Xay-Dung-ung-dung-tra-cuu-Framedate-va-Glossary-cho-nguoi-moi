const db = require('./database');

const findAllCharacters = async () => {
    const [rows] = await db.execute('SELECT * FROM characters ORDER BY name ASC');
    return rows;
};

const findCharacterById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM characters WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createCharacter = async ({ name, debut_date, description, difficulty, type, image_url }) => {
    const [result] = await db.execute(
        `INSERT INTO characters (name, debut_date, description, difficulty, type, image_url) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, debut_date || null, description || null, difficulty, type || null, image_url || null]
    );
    return { insertId: result.insertId };
};

const updateCharacter = async (id, { name, debut_date, description, difficulty, type, image_url }) => {
    await db.execute(
        `UPDATE characters 
         SET name = ?, debut_date = ?, description = ?, difficulty = ?, type = ?, image_url = ?
         WHERE id = ?`,
        [name, debut_date, description, difficulty, type, image_url, id]
    );
};

const deleteCharacter = async (id) => {
    const [result] = await db.execute('DELETE FROM characters WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

const findMovesByCharacterId = async (characterId) => {
    const [rows] = await db.execute(
        'SELECT * FROM character_moves WHERE character_id = ? ORDER BY id ASC',
        [characterId]
    );
    return rows;
};

const findMoveByIdAndCharacterId = async (moveId, characterId) => {
    const [rows] = await db.execute(
        'SELECT * FROM character_moves WHERE id = ? AND character_id = ?',
        [moveId, characterId]
    );
    return rows.length > 0 ? rows[0] : null;
};

const findBaseStatsByCharacterId = async (characterId) => {
    const [rows] = await db.execute(
        'SELECT * FROM character_base_stats WHERE character_id = ?',
        [characterId]
    );
    return rows.length > 0 ? rows[0] : null;
};

const createMove = async (characterId, { CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY }) => {
    const [result] = await db.execute(
        `INSERT INTO character_moves
        (character_id, CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [characterId, CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY || null]
    );
    const [rows] = await db.execute('SELECT * FROM character_moves WHERE id = ?', [result.insertId]);
    return rows[0];
};

const updateMove = async (moveId, characterId, { CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY }) => {
    await db.execute(
        `UPDATE character_moves SET CHAR_NAME = ?, CHAR_MOVE = ?, DAMAGE = ?, START_UP = ?,
        ACTIVE = ?, RECOVERY = ?, ADV_ON_BLOCK = ?, ADV_ON_HIT = ?, INVULNERABILITY = ?
        WHERE id = ? AND character_id = ?`,
        [CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY, moveId, characterId]
    );
    const [rows] = await db.execute('SELECT * FROM character_moves WHERE id = ?', [moveId]);
    return rows[0];
};

const deleteMove = async (moveId, characterId) => {
    const [result] = await db.execute(
        'DELETE FROM character_moves WHERE id = ? AND character_id = ?',
        [moveId, characterId]
    );
    return result.affectedRows > 0;
};

const upsertBaseStats = async (characterId, { HP, WALKSPEED, JUMP_START_UP, DASH_START_UP, BACKDASH, REVERSAL }) => {
    await db.execute(
        `INSERT INTO character_base_stats
        (character_id, HP, WALKSPEED, JUMP_START_UP, DASH_START_UP, BACKDASH, REVERSAL)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE HP = VALUES(HP), WALKSPEED = VALUES(WALKSPEED),
        JUMP_START_UP = VALUES(JUMP_START_UP), DASH_START_UP = VALUES(DASH_START_UP),
        BACKDASH = VALUES(BACKDASH), REVERSAL = VALUES(REVERSAL)`,
        [characterId, HP, WALKSPEED, JUMP_START_UP, DASH_START_UP, BACKDASH, REVERSAL || null]
    );
    return await findBaseStatsByCharacterId(characterId);
};

module.exports = {
    findAllCharacters,
    findCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    findMovesByCharacterId,
    findMoveByIdAndCharacterId,
    findBaseStatsByCharacterId,
    createMove,
    updateMove,
    deleteMove,
    upsertBaseStats
};
