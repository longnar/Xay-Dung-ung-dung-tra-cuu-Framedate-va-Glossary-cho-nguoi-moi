const mysql = require('mysql2/promise');
require('dotenv').config();

const characters = [
  {
    name: 'Shirakami Fubuki',
    code: 'Fubuki',
    debut_date: '2018-06-01',
    type: 'Rushdown / Speed',
    difficulty: 2,
    description: 'Hồ ly tinh nghịch của Hololive GAMERS. Lối đánh tốc độ cao, khả năng áp sát nhanh và các chuỗi combo biến ảo khó lường.',
    image_url: '/cards/Fubuki Promo Art Big.jpg.txt',
    stats: { HP: 1000, WALKSPEED: 6, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: '22H (Kon Burst)' },
    moves: [
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '5L', DAMAGE: 400, START_UP: 5, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '5M', DAMAGE: 700, START_UP: 8, ACTIVE: 4, RECOVERY: 14, ADV_ON_BLOCK: -4, ADV_ON_HIT: 3, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '5H', DAMAGE: 1100, START_UP: 12, ACTIVE: 5, RECOVERY: 19, ADV_ON_BLOCK: -6, ADV_ON_HIT: 4, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '2L', DAMAGE: 350, START_UP: 6, ACTIVE: 2, RECOVERY: 8, ADV_ON_BLOCK: 1, ADV_ON_HIT: 3, INVULNERABILITY: 'Low hit' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '2M', DAMAGE: 650, START_UP: 9, ACTIVE: 3, RECOVERY: 13, ADV_ON_BLOCK: -3, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '2H', DAMAGE: 1000, START_UP: 11, ACTIVE: 6, RECOVERY: 22, ADV_ON_BLOCK: -10, ADV_ON_HIT: 8, INVULNERABILITY: 'Anti-Air (Frame 4)' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '236L/M/H (Bite)', DAMAGE: 900, START_UP: 13, ACTIVE: 4, RECOVERY: 17, ADV_ON_BLOCK: -5, ADV_ON_HIT: 4, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: '214L/M/H (Fox Dash)', DAMAGE: 1200, START_UP: 16, ACTIVE: 4, RECOVERY: 20, ADV_ON_BLOCK: -2, ADV_ON_HIT: 6, INVULNERABILITY: 'Projectile invul (F6-12)' },
      { CHAR_NAME: 'Fubuki', CHAR_MOVE: 'Super (Say Fan!)', DAMAGE: 3500, START_UP: 9, ACTIVE: 8, RECOVERY: 34, ADV_ON_BLOCK: -20, ADV_ON_HIT: 30, INVULNERABILITY: 'Full invul (F1-11)' }
    ]
  },
  {
    name: 'Inugami Korone',
    code: 'Korone',
    debut_date: '2019-04-13',
    type: 'Brawler / Pressure',
    difficulty: 1,
    description: 'Chú cún năng động với sức mạnh cơ bắp đáng nể. Lối đánh càn quét áp lực tầm gần cực mạnh với đòn đấm liên hoàn.',
    image_url: '/cards/Korone Promo Art Big.jpg.txt',
    stats: { HP: 1050, WALKSPEED: 5, JUMP_START_UP: 5, DASH_START_UP: 4, BACKDASH: 20, REVERSAL: '623H (Uppercut)' },
    moves: [
      { CHAR_NAME: 'Korone', CHAR_MOVE: '5L', DAMAGE: 420, START_UP: 6, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: 0, ADV_ON_HIT: 3, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Korone', CHAR_MOVE: '5M', DAMAGE: 750, START_UP: 9, ACTIVE: 4, RECOVERY: 12, ADV_ON_BLOCK: -2, ADV_ON_HIT: 4, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Korone', CHAR_MOVE: '5H', DAMAGE: 1200, START_UP: 13, ACTIVE: 6, RECOVERY: 18, ADV_ON_BLOCK: -5, ADV_ON_HIT: 5, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Korone', CHAR_MOVE: '2H', DAMAGE: 1050, START_UP: 10, ACTIVE: 5, RECOVERY: 24, ADV_ON_BLOCK: -12, ADV_ON_HIT: 7, INVULNERABILITY: 'Anti-Air' },
      { CHAR_NAME: 'Korone', CHAR_MOVE: '623L/M/H (Dragon Punch)', DAMAGE: 1300, START_UP: 8, ACTIVE: 6, RECOVERY: 28, ADV_ON_BLOCK: -18, ADV_ON_HIT: 12, INVULNERABILITY: 'Full invul on H' }
    ]
  },
  {
    name: 'Tokino Sora',
    code: 'Sora',
    debut_date: '2017-09-07',
    type: 'All-Rounder / Shoto',
    difficulty: 1,
    description: 'Thần tượng tiên phong của Hololive. Bộ kỹ năng cân bằng hoàn hảo cho người mới: đòn chưởng tầm xa và đòn đánh thăng thiên.',
    image_url: '/cards/Sora Promo Art Big.jpg.txt',
    stats: { HP: 1000, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: '623H (Rising Mic)' },
    moves: [
      { CHAR_NAME: 'Sora', CHAR_MOVE: '5L', DAMAGE: 400, START_UP: 5, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 3, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Sora', CHAR_MOVE: '236L/M/H (Note Shot)', DAMAGE: 800, START_UP: 14, ACTIVE: 20, RECOVERY: 22, ADV_ON_BLOCK: -4, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Sora', CHAR_MOVE: '623L/M/H (Rising Mic)', DAMAGE: 1200, START_UP: 7, ACTIVE: 5, RECOVERY: 30, ADV_ON_BLOCK: -22, ADV_ON_HIT: 10, INVULNERABILITY: 'Full invul' }
    ]
  },
  {
    name: 'Nakiri Ayame',
    code: 'Ayame',
    debut_date: '2018-09-03',
    type: 'Dual Swords / Rushdown',
    difficulty: 3,
    description: 'Quỷ kiếm Ojou với song kiếm Asura và Rasetsu. Tầm đánh đao rộng, khả năng áp đảo dồn góc và combo sát thương bùng nổ.',
    image_url: '/cards/Ayame Promo Art Big.jpg.txt',
    stats: { HP: 950, WALKSPEED: 6, JUMP_START_UP: 4, DASH_START_UP: 3, BACKDASH: 17, REVERSAL: '236H (Demon Slash)' },
    moves: [
      { CHAR_NAME: 'Ayame', CHAR_MOVE: '5L', DAMAGE: 400, START_UP: 5, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Ayame', CHAR_MOVE: '5M', DAMAGE: 750, START_UP: 8, ACTIVE: 4, RECOVERY: 14, ADV_ON_BLOCK: -3, ADV_ON_HIT: 3, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Ayame', CHAR_MOVE: '236L/M/H (Demon Slash)', DAMAGE: 1350, START_UP: 11, ACTIVE: 5, RECOVERY: 21, ADV_ON_BLOCK: -7, ADV_ON_HIT: 5, INVULNERABILITY: 'None' }
    ]
  },
  {
    name: 'Hoshimachi Suisei',
    code: 'Suisei',
    debut_date: '2018-03-22',
    type: 'Space Zoner / Mid-Range',
    difficulty: 3,
    description: 'Ngôi sao băng của Hololive với vũ khí rìu và sao băng. Kiểm soát cự ly trung bình xuất sắc và đòn kết liễu tàn khốc.',
    image_url: '/cards/Suisei Promo Art Big.jpg.txt',
    stats: { HP: 950, WALKSPEED: 5, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 19, REVERSAL: '22H (Meteor Cleave)' },
    moves: [
      { CHAR_NAME: 'Suisei', CHAR_MOVE: '5L', DAMAGE: 380, START_UP: 6, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Suisei', CHAR_MOVE: '5H (Axe Smash)', DAMAGE: 1300, START_UP: 14, ACTIVE: 5, RECOVERY: 22, ADV_ON_BLOCK: -8, ADV_ON_HIT: 6, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Suisei', CHAR_MOVE: '214L/M/H (Comet Drop)', DAMAGE: 1100, START_UP: 18, ACTIVE: 6, RECOVERY: 20, ADV_ON_BLOCK: 2, ADV_ON_HIT: 7, INVULNERABILITY: 'None' }
    ]
  },
  {
    name: 'Kiryu Coco',
    code: 'Coco',
    debut_date: '2019-12-28',
    type: 'Grappler / Heavy Brawler',
    difficulty: 2,
    description: 'Huyền thoại Rồng Yakuza. Sát thương cực lớn, đòn vật lệnh (Command Grab) uy lực và lượng máu dồi dào nhất game.',
    image_url: '/cards/Coco Promo Art Big.jpg.txt',
    stats: { HP: 1150, WALKSPEED: 4, JUMP_START_UP: 6, DASH_START_UP: 6, BACKDASH: 22, REVERSAL: '632146H (Dragon Buster)' },
    moves: [
      { CHAR_NAME: 'Coco', CHAR_MOVE: '5L', DAMAGE: 450, START_UP: 7, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: 0, ADV_ON_HIT: 3, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Coco', CHAR_MOVE: '632146L/M/H (Dragon Grab)', DAMAGE: 2200, START_UP: 5, ACTIVE: 2, RECOVERY: 36, ADV_ON_BLOCK: 0, ADV_ON_HIT: 25, INVULNERABILITY: 'Armor on H' }
    ]
  },
  {
    name: 'Shishiro Botan',
    code: 'Botan',
    debut_date: '2020-08-14',
    type: 'Gunner / Zoner',
    difficulty: 4,
    description: 'Sư tử xạ thủ FPS. Sử dụng súng trường, súng phóng lựu và bẫy claymore để kiểm soát toàn bộ màn hình từ xa.',
    image_url: '/cards/Botan Promo Art Big.jpg.txt',
    stats: { HP: 950, WALKSPEED: 4, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 20, REVERSAL: '214H (Tactical Roll)' },
    moves: [
      { CHAR_NAME: 'Botan', CHAR_MOVE: '5L', DAMAGE: 380, START_UP: 6, ACTIVE: 2, RECOVERY: 10, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Botan', CHAR_MOVE: '236L/M/H (Rifle Fire)', DAMAGE: 900, START_UP: 12, ACTIVE: 8, RECOVERY: 22, ADV_ON_BLOCK: -6, ADV_ON_HIT: 2, INVULNERABILITY: 'None' }
    ]
  },
  {
    name: 'Aki Rosenthal',
    code: 'Aki',
    debut_date: '2018-06-01',
    type: 'Setup / Trap / Portal',
    difficulty: 5,
    description: 'Nữ tinh linh siren với bím tóc bay kỳ ảo. Lối đánh bẫy cổng không gian (Portal Setup) và ép góc cực kỳ biến ảo.',
    image_url: '/cards/Aki Promo Art Big.jpg.txt',
    stats: { HP: 900, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: '22H (Portal Flash)' },
    moves: [
      { CHAR_NAME: 'Aki', CHAR_MOVE: '5L', DAMAGE: 380, START_UP: 5, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Aki', CHAR_MOVE: '214L/M/H (Portal Place)', DAMAGE: 0, START_UP: 16, ACTIVE: 1, RECOVERY: 14, ADV_ON_BLOCK: 0, ADV_ON_HIT: 0, INVULNERABILITY: 'None' }
    ]
  },
  {
    name: 'Usada Pekora',
    code: 'Pekora',
    debut_date: '2019-07-17',
    type: 'Trickster / Item Toss',
    difficulty: 4,
    description: 'Thỏ tinh quái với kho vũ khí TNT và vật phẩm ngẫu nhiên. Khiến đối thủ hoang mang với quỹ đạo tấn công khó đoán.',
    image_url: '/cards/Pekora Promo Art Big 2.png.txt',
    stats: { HP: 950, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 16, REVERSAL: '22H (TNT Guard)' },
    moves: [
      { CHAR_NAME: 'Pekora', CHAR_MOVE: '5L', DAMAGE: 390, START_UP: 6, ACTIVE: 2, RECOVERY: 9, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Pekora', CHAR_MOVE: '236L/M/H (Item Throw)', DAMAGE: 700, START_UP: 15, ACTIVE: 40, RECOVERY: 19, ADV_ON_BLOCK: 1, ADV_ON_HIT: 4, INVULNERABILITY: 'None' }
    ]
  },
  {
    name: "Ninomae Ina'nis",
    code: 'Ina',
    debut_date: '2020-09-13',
    type: 'Disjoint / Mid-Range',
    difficulty: 3,
    description: 'Tư tế cổ thần với những xúc tu thần bí. Tầm đánh đòn tay cực xa, an toàn ở cự ly trung bình và khống chế không gian.',
    image_url: '/cards/Ina Promo Art Big.png.txt',
    stats: { HP: 950, WALKSPEED: 4, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 20, REVERSAL: '22H (Void Awakening)' },
    moves: [
      { CHAR_NAME: 'Ina', CHAR_MOVE: '5L', DAMAGE: 400, START_UP: 6, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Ina', CHAR_MOVE: '5H (Tentacle Sweep)', DAMAGE: 1100, START_UP: 14, ACTIVE: 5, RECOVERY: 21, ADV_ON_BLOCK: -5, ADV_ON_HIT: 4, INVULNERABILITY: 'Disjoint hitbox' }
    ]
  },
  {
    name: 'Kureiji Ollie',
    code: 'Ollie',
    debut_date: '2020-12-04',
    type: 'Aggro / Swordsman',
    difficulty: 3,
    description: 'Zombie năng lượng vô tận với thanh kiếm găm trên đầu. Tấn công điên cuồng, cơ động cao và áp lực đòn đánh dồn dập.',
    image_url: '/cards/Ollie Promo Art Big.png.txt',
    stats: { HP: 950, WALKSPEED: 6, JUMP_START_UP: 4, DASH_START_UP: 3, BACKDASH: 17, REVERSAL: '623H (Head Sword Slash)' },
    moves: [
      { CHAR_NAME: 'Ollie', CHAR_MOVE: '5L', DAMAGE: 400, START_UP: 5, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 3, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Ollie', CHAR_MOVE: '623L/M/H (Head Sword)', DAMAGE: 1250, START_UP: 8, ACTIVE: 5, RECOVERY: 27, ADV_ON_BLOCK: -16, ADV_ON_HIT: 11, INVULNERABILITY: 'Full invul' }
    ]
  },
  {
    name: 'Hakui Koyori',
    code: 'Koyori',
    debut_date: '2021-11-28',
    type: 'Scientist / Potion Buff',
    difficulty: 4,
    description: 'Nhà khoa học thiên tài với các bình hóa chất thí nghiệm. Tự tạo buff cho bản thân và gây debuff độc hại cho đối thủ.',
    image_url: '/cards/Koyori Promo Art Big.jpg.txt',
    stats: { HP: 950, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: '236H (Chemical Flash)' },
    moves: [
      { CHAR_NAME: 'Koyori', CHAR_MOVE: '5L', DAMAGE: 390, START_UP: 6, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 2, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Koyori', CHAR_MOVE: '214L/M/H (Drink Potion)', DAMAGE: 0, START_UP: 22, ACTIVE: 1, RECOVERY: 12, ADV_ON_BLOCK: 0, ADV_ON_HIT: 0, INVULNERABILITY: 'None' }
    ]
  },
  {
    name: 'Koseki Bijou (Biboo)',
    code: 'Biboo',
    debut_date: '2023-07-30',
    type: 'Counter / Defensive',
    difficulty: 2,
    description: 'Viên đá quý Moai kiên cố từ Hololive English -Advent-. Sở hữu các đòn phản kích (Parry) và thể chất kim cương phòng thủ vững chắc.',
    image_url: '/cards/Biboo Promo Art Big.png.txt',
    stats: { HP: 1050, WALKSPEED: 4, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 19, REVERSAL: '22H (Diamond Guard Counter)' },
    moves: [
      { CHAR_NAME: 'Biboo', CHAR_MOVE: '5L', DAMAGE: 420, START_UP: 6, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: 0, ADV_ON_HIT: 3, INVULNERABILITY: 'None' },
      { CHAR_NAME: 'Biboo', CHAR_MOVE: '22L/M/H (Parry)', DAMAGE: 1400, START_UP: 2, ACTIVE: 12, RECOVERY: 20, ADV_ON_BLOCK: 4, ADV_ON_HIT: 15, INVULNERABILITY: 'Counter stance' }
    ]
  }
];

async function seed() {
  console.log('Connecting to database...');
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'idol_showdown_wiki',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });

  console.log('Connected! Seeding 13 Idol Showdown characters...');

  for (const c of characters) {
    // 1. Check or insert character
    const [existing] = await connection.query('SELECT id FROM characters WHERE name = ?', [c.name]);
    let characterId;

    if (existing.length > 0) {
      characterId = existing[0].id;
      console.log(`- Updating character: ${c.name} (ID: ${characterId})`);
      await connection.query(
        'UPDATE characters SET debut_date = ?, description = ?, difficulty = ?, type = ?, image_url = ? WHERE id = ?',
        [c.debut_date, c.description, c.difficulty, c.type, c.image_url, characterId]
      );
    } else {
      console.log(`+ Inserting character: ${c.name}`);
      const [insertResult] = await connection.query(
        'INSERT INTO characters (name, debut_date, description, difficulty, type, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [c.name, c.debut_date, c.description, c.difficulty, c.type, c.image_url]
      );
      characterId = insertResult.insertId;
    }

    // 2. Upsert Base Stats
    if (c.stats) {
      await connection.query(
        `INSERT INTO character_base_stats (character_id, HP, WALKSPEED, JUMP_START_UP, DASH_START_UP, BACKDASH, REVERSAL)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE HP = VALUES(HP), WALKSPEED = VALUES(WALKSPEED), JUMP_START_UP = VALUES(JUMP_START_UP),
         DASH_START_UP = VALUES(DASH_START_UP), BACKDASH = VALUES(BACKDASH), REVERSAL = VALUES(REVERSAL)`,
        [characterId, c.stats.HP, c.stats.WALKSPEED, c.stats.JUMP_START_UP, c.stats.DASH_START_UP, c.stats.BACKDASH, c.stats.REVERSAL]
      );
    }

    // 3. Upsert Moves
    if (c.moves && c.moves.length > 0) {
      for (const m of c.moves) {
        const [existingMove] = await connection.query(
          'SELECT id FROM character_moves WHERE character_id = ? AND CHAR_MOVE = ?',
          [characterId, m.CHAR_MOVE]
        );
        if (existingMove.length === 0) {
          await connection.query(
            `INSERT INTO character_moves (character_id, CHAR_NAME, CHAR_MOVE, DAMAGE, START_UP, ACTIVE, RECOVERY, ADV_ON_BLOCK, ADV_ON_HIT, INVULNERABILITY)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [characterId, m.CHAR_NAME, m.CHAR_MOVE, m.DAMAGE, m.START_UP, m.ACTIVE, m.RECOVERY, m.ADV_ON_BLOCK, m.ADV_ON_HIT, m.INVULNERABILITY]
          );
        }
      }
    }
  }

  console.log('Seeding completed successfully!');
  await connection.end();
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
