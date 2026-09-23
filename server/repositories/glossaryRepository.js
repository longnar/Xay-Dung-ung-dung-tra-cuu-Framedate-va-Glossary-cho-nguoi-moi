const db = require('./database');

const findAllGlossaries = async () => {
    const [rows] = await db.execute('SELECT * FROM glossaries ORDER BY term ASC');
    return rows;
};

const findGlossaryById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM glossaries WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const findGlossaryByTerm = async (term) => {
    const [rows] = await db.execute('SELECT * FROM glossaries WHERE term = ?', [term]);
    return rows.length > 0 ? rows[0] : null;
};

const findGlossaryByTermExcludeId = async (term, id) => {
    const [rows] = await db.execute('SELECT * FROM glossaries WHERE term = ? AND id != ?', [term, id]);
    return rows.length > 0 ? rows[0] : null;
};

const createGlossary = async ({ term, definition, level, image_url, video_url }) => {
    const [result] = await db.execute(
        `INSERT INTO glossaries (term, definition, level, image_url, video_url) 
         VALUES (?, ?, ?, ?, ?)`,
        [term, definition, level, image_url || null, video_url || null]
    );
    return { insertId: result.insertId };
};

const updateGlossary = async (id, { term, definition, level, image_url, video_url }) => {
    await db.execute(
        `UPDATE glossaries 
         SET term = ?, definition = ?, level = ?, image_url = ?, video_url = ? 
         WHERE id = ?`,
        [term, definition, level, image_url, video_url, id]
    );
};

const deleteGlossary = async (id) => {
    const [result] = await db.execute('DELETE FROM glossaries WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    findAllGlossaries,
    findGlossaryById,
    findGlossaryByTerm,
    findGlossaryByTermExcludeId,
    createGlossary,
    updateGlossary,
    deleteGlossary
};
