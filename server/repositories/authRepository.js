const db = require('./database');

const execute = (sql, params) => db.execute(sql, params);

const findByUsername = (username) =>
    db.execute('SELECT * FROM users WHERE username = ?', [username]);

const usernameExists = (username) =>
    db.execute('SELECT id FROM users WHERE username = ?', [username]);

const createUser = (username, passwordHash, role) =>
    db.execute(
        'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
        [username, passwordHash, role]
    );

module.exports = { execute, findByUsername, usernameExists, createUser };
