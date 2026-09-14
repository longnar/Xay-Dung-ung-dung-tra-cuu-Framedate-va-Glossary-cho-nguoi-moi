const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
    console.log('Starting Database Setup...');
    
    // Connect to MySQL server (using credentials from .env)
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    console.log('Connected to MySQL server successfully.');

    // Read db_setup.sql file
    const sqlFile = path.join(__dirname, 'schema', '001_initial_schema.sql');
    if (!fs.existsSync(sqlFile)) {
        throw new Error(`Database setup file not found at: ${sqlFile}`);
    }
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');

    // Split SQL file contents into separate statements
    // We split by semicolon, excluding lines starting with comments or empty space
    const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute.`);

    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        // Log short preview of the query
        const preview = stmt.replace(/\s+/g, ' ').substring(0, 60);
        console.log(`[${i + 1}/${statements.length}] Executing: ${preview}...`);
        await connection.query(stmt);
    }

    console.log('==================================================');
    console.log('Database tables successfully initialized and seeded!');
    console.log('==================================================');
    await connection.end();
}

setup().catch(err => {
    console.error('==================================================');
    console.error('Database setup failed!');
    console.error('Details:', err.message);
    console.error('==================================================');
    console.error('Please make sure:');
    console.error('1. Your MySQL server is running.');
    console.error('2. DB credentials in your .env file match your local MySQL configuration.');
    console.error('==================================================');
    process.exit(1);
});
