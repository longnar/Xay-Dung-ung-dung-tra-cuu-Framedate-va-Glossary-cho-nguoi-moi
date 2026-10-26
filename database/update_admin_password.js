const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updateAdminPassword() {
  const newPassword = process.env.ADMIN_NEW_PASSWORD || 'Admin@Idol2026!';
  console.log('Connecting to Aiven Cloud MySQL database...');
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  const saltRounds = 10;
  const hash = await bcrypt.hash(newPassword, saltRounds);

  await conn.query('UPDATE users SET password_hash = ? WHERE username = ?', [hash, 'admin']);
  console.log('==================================================');
  console.log('Admin password updated successfully in Aiven DB!');
  console.log('Username: admin');
  console.log('New Password: ' + newPassword);
  console.log('==================================================');

  await conn.end();
}

updateAdminPassword().catch(err => {
  console.error('Failed to update admin password:', err);
  process.exit(1);
});
