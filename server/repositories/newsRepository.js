const db = require('./database');

const findAllPatches = async () => {
    // Tự động tạo bảng nếu chưa tồn tại
    await db.execute(`
        CREATE TABLE IF NOT EXISTS news_patches (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(150) NOT NULL,
            version VARCHAR(50) NOT NULL,
            release_date DATE NOT NULL,
            content MEDIUMTEXT NOT NULL,
            is_major TINYINT(1) DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    const [rows] = await db.execute('SELECT * FROM news_patches ORDER BY release_date DESC, id DESC');
    return rows;
};

const findPatchById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM news_patches WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const createPatch = async ({ title, version, release_date, content, is_major }) => {
    const [result] = await db.execute(
        `INSERT INTO news_patches (title, version, release_date, content, is_major)
         VALUES (?, ?, ?, ?, ?)`,
        [title, version || 'v5.x', release_date || new Date().toISOString().substring(0, 10), content, is_major ? 1 : 0]
    );
    return { insertId: result.insertId };
};

const updatePatch = async (id, { title, version, release_date, content, is_major }) => {
    await db.execute(
        `UPDATE news_patches 
         SET title = ?, version = ?, release_date = ?, content = ?, is_major = ?
         WHERE id = ?`,
        [title, version, release_date, content, is_major ? 1 : 0, id]
    );
};

const deletePatch = async (id) => {
    const [result] = await db.execute('DELETE FROM news_patches WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    findAllPatches,
    findPatchById,
    createPatch,
    updatePatch,
    deletePatch
};
