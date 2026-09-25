const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const useSsl = process.env.DB_SSL === 'true';
const ssl = useSsl
    ? {
        ca: (process.env.DB_CA_PATH && fs.existsSync(process.env.DB_CA_PATH))
            ? fs.readFileSync(process.env.DB_CA_PATH, 'utf8')
            : undefined,
        rejectUnauthorized: false
    }
    : undefined;

// Create the connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'idol_showdown_wiki',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 10000),
    ssl
});

// Test connection pool connection
pool.getConnection()
    .then(connection => {
        console.log('Database connection pool established successfully.');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
    });

module.exports = pool;
