const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const migrationPattern = /^db_migration_\d+_.+\.sql$/;

const splitStatements = (sql) => sql
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean);

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'idol_showdown_wiki',
        connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 10000),
        ssl: process.env.DB_SSL === 'true'
            ? {
                ca: process.env.DB_CA_PATH
                    ? fs.readFileSync(process.env.DB_CA_PATH, 'utf8')
                    : undefined,
                rejectUnauthorized: true
            }
            : undefined
    });

    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                version VARCHAR(100) PRIMARY KEY,
                applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);

        const [appliedRows] = await connection.query('SELECT version FROM schema_migrations');
        const applied = new Set(appliedRows.map((row) => row.version));
        const migrations = fs.readdirSync(path.join(__dirname, 'migrations'))
            .filter((file) => migrationPattern.test(file))
            .sort();

        for (const migration of migrations) {
            if (applied.has(migration)) {
                console.log(`Skipping ${migration} (already applied).`);
                continue;
            }

            console.log(`Applying ${migration}...`);
            for (const statement of splitStatements(fs.readFileSync(path.join(__dirname, 'migrations', migration), 'utf8'))) {
                await connection.query(statement);
            }
            await connection.query('INSERT INTO schema_migrations (version) VALUES (?)', [migration]);
        }

        console.log('Database migrations completed successfully.');
    } finally {
        await connection.end();
    }
}

migrate().catch((error) => {
    console.error('Database migration failed:', error.message);
    process.exitCode = 1;
});
