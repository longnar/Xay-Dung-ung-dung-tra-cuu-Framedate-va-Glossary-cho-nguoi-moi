const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Load FALLBACK_CHARACTER_DETAILS from src/data/characterFallbackData.js
const fallbackFilePath = path.join(__dirname, '..', 'src', 'data', 'characterFallbackData.js');
const fileContent = fs.readFileSync(fallbackFilePath, 'utf8');
const cleanContent = fileContent.replace(/export /g, '');
const sandbox = {};
const fn = new Function('sandbox', `${cleanContent}; sandbox.FALLBACK = FALLBACK_CHARACTER_DETAILS;`);
fn(sandbox);
const fallbackData = sandbox.FALLBACK;

async function syncAllMoves() {
  console.log('Connecting to Aiven Cloud MySQL database...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'idol_showdown_wiki',
    ssl: { rejectUnauthorized: false },
  });

  console.log('Connected! Syncing all moves from fallback data into Database...');

  // Get all characters from DB
  const [dbCharacters] = await connection.query('SELECT id, name FROM characters');
  console.log(`Found ${dbCharacters.length} characters in database.`);

  let totalInserted = 0;
  let totalUpdated = 0;

  for (const [charName, charInfo] of Object.entries(fallbackData)) {
    // Find matching character in DB
    const dbChar = dbCharacters.find((c) =>
      c.name.toLowerCase().includes(charName.toLowerCase()) ||
      charName.toLowerCase().includes(c.name.toLowerCase())
    );

    if (!dbChar) {
      console.warn(`[Warning] No matching DB character found for "${charName}"`);
      continue;
    }

    const charId = dbChar.id;
    console.log(`\n=== Processing "${charName}" (DB ID: ${charId}) ===`);

    // 1. Sync Base Stats if available
    if (charInfo.stats) {
      const s = charInfo.stats;
      await connection.query(
        `INSERT INTO character_base_stats (character_id, HP, WALKSPEED, JUMP_START_UP, DASH_START_UP, BACKDASH, REVERSAL)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
            HP = VALUES(HP), 
            WALKSPEED = VALUES(WALKSPEED), 
            JUMP_START_UP = VALUES(JUMP_START_UP),
            DASH_START_UP = VALUES(DASH_START_UP), 
            BACKDASH = VALUES(BACKDASH), 
            REVERSAL = VALUES(REVERSAL)`,
        [charId, s.HP || 1000, typeof s.WALKSPEED === 'number' ? s.WALKSPEED : 5, s.JUMP_START_UP || 4, s.DASH_START_UP || 4, s.BACKDASH || 18, s.REVERSAL || '']
      );
    }

    // 2. Sync Moves
    if (Array.isArray(charInfo.moves)) {
      for (const m of charInfo.moves) {
        const [existing] = await connection.query(
          'SELECT id FROM character_moves WHERE character_id = ? AND CHAR_MOVE = ?',
          [charId, m.CHAR_MOVE]
        );

        if (existing.length > 0) {
          // Update existing move with full fields
          await connection.query(
            `UPDATE character_moves SET 
              CHAR_NAME = ?, 
              DAMAGE = ?, 
              START_UP = ?, 
              ACTIVE = ?, 
              RECOVERY = ?, 
              ADV_ON_BLOCK = ?, 
              ADV_ON_HIT = ?, 
              INVULNERABILITY = ?,
              hitbox_url = COALESCE(?, hitbox_url),
              hitbox_caption = COALESCE(?, hitbox_caption),
              move_type = ?,
              guard = ?,
              version = ?,
              properties = ?,
              description = ?
             WHERE id = ?`,
            [
              m.CHAR_NAME || charName,
              m.DAMAGE ?? 500,
              m.START_UP ?? 6,
              m.ACTIVE ?? 3,
              m.RECOVERY ?? 10,
              m.ADV_ON_BLOCK ?? 0,
              m.ADV_ON_HIT ?? 0,
              m.INVULNERABILITY || 'None',
              m.hitbox_url || null,
              m.hitbox_caption || null,
              m.move_type || 'normal',
              m.guard || 'Mid',
              m.version || null,
              m.properties || null,
              m.description || null,
              existing[0].id
            ]
          );
          totalUpdated++;
        } else {
          // Insert new move
          await connection.query(
            `INSERT INTO character_moves (
              character_id, CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, 
              ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY, hitbox_url, hitbox_caption, 
              move_type, guard, version, properties, description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              charId,
              m.CHAR_NAME || charName,
              m.CHAR_MOVE,
              m.DAMAGE ?? 500,
              m.START_UP ?? 6,
              m.ACTIVE ?? 3,
              m.RECOVERY ?? 10,
              m.ADV_ON_BLOCK ?? 0,
              m.ADV_ON_HIT ?? 0,
              m.INVULNERABILITY || 'None',
              m.hitbox_url || null,
              m.hitbox_caption || null,
              m.move_type || 'normal',
              m.guard || 'Mid',
              m.version || null,
              m.properties || null,
              m.description || null
            ]
          );
          totalInserted++;
        }
      }
    }
  }

  console.log('\n==================================================');
  console.log(`Sync completed successfully!`);
  console.log(`  - Total new moves inserted: ${totalInserted}`);
  console.log(`  - Total existing moves updated: ${totalUpdated}`);
  
  const [[finalMovesCount]] = await connection.query('SELECT COUNT(*) as total FROM character_moves');
  console.log(`  - Total moves currently in database: ${finalMovesCount.total}`);
  console.log('==================================================');

  await connection.end();
}

syncAllMoves().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
