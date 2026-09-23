const db = require('./database');

/**
 * Tìm kiếm user theo username
 * @param {string} username
 * @returns {Promise<Object|null>}
 */
const findUserByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows.length > 0 ? rows[0] : null;
};

/**
 * Tạo người dùng mới trong database
 * @param {Object} userData
 * @param {string} userData.username
 * @param {string} userData.password_hash
 * @param {string} userData.role
 * @returns {Promise<Object>} Object chứa insertId
 */
const createUser = async ({ username, password_hash, role }) => {
    const [result] = await db.execute(
        'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
        [username, password_hash, role]
    );
    return { insertId: result.insertId };
};

module.exports = {
    findUserByUsername,
    createUser
};
