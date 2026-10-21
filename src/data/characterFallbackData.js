// Du lieu fallback thong so co ban va Frame Data chuan Mizuumi Wiki cho cac nhan vat Idol Showdown
export const FALLBACK_CHARACTER_DETAILS = {
  'Hakui Koyori': {
    stats: {
      HP: 1000,
      WALKSPEED: 'Average',
      JUMP_START_UP: 5,
      DASH_START_UP: 7,
      BACKDASH: 28,
      BACKDASH_NOTE: '(1-5F Full Invuln, 1-19F Grab Invuln)',
      REVERSAL: '236H (13F)'
    },
    moves: [
      {
        id: 37,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '5L',
        move_type: 'normal',
        version: 'Chemistry / Gadget',
        DAMAGE: 30,
        guard: 'Mid',
        START_UP: 5,
        ACTIVE: 3,
        RECOVERY: 9,
        ADV_ON_BLOCK: 0,
        ADV_ON_HIT: 3,
        INVULNERABILITY: 'None',
        hitbox_url: '/hitboxes/hitbox-5l.svg',
        hitbox_caption: 'Khung va chạm 5L (Active Frame 5)',
        properties: 'Self-Gatling Count: 3. -10 on block khi cancel sang 5S',
        description: 'Đòn chọc nhanh tầm gần, trúng được cả đối phương đang ngồi. Đòn mở chuỗi combo cốt lõi.',
        stances: [
          { name: 'Chemistry (c.5L)', damage: 30, guard: 'Mid', startup: 5, active: 3, recovery: 9, onBlock: 0, onHit: 3 },
          { name: 'Gadget (g.5L)', damage: 30, guard: 'Mid', startup: 5, active: 3, recovery: 9, onBlock: 0, onHit: 3 }
        ]
      },
      {
        id: 38,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '5M',
        move_type: 'normal',
        version: 'Chemistry / Gadget',
        DAMAGE: 60,
        guard: 'Mid',
        START_UP: 8,
        ACTIVE: 6,
        RECOVERY: 19,
        ADV_ON_BLOCK: -7,
        ADV_ON_HIT: -2,
        INVULNERABILITY: 'None',
        hitbox_url: '/hitboxes/hitbox-5m.svg',
        hitbox_caption: 'Khung va chạm 5M (Active Frame 8-13)',
        properties: '-4 on block khi cancel sang 5S',
        description: 'Đòn tầm trung kiểm soát không gian. Bản Gadget khởi đầu chậm hơn 1 frame nhưng phục hồi nhanh hơn.',
        stances: [
          { name: 'Chemistry (c.5M)', damage: 60, guard: 'Mid', startup: 8, active: 6, recovery: 19, onBlock: -7, onHit: -2 },
          { name: 'Gadget (g.5M)', damage: 50, guard: 'Mid', startup: 9, active: 7, recovery: 15, onBlock: -6, onHit: 3 }
        ]
      },
      {
        id: 39,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '5H',
        move_type: 'normal',
        version: 'Chemistry / Gadget',
        DAMAGE: 70,
        guard: 'Mid',
        START_UP: 11,
        ACTIVE: 5,
        RECOVERY: 22,
        ADV_ON_BLOCK: -7,
        ADV_ON_HIT: -2,
        INVULNERABILITY: 'None',
        hitbox_url: '/hitboxes/hitbox-5h.svg',
        hitbox_caption: 'Khung va chạm 5H (Đòn đánh Disjoint không hurtbox)',
        properties: '-2 on block khi cancel sang 5S (Chemistry) / 0 on block (Gadget)',
        description: 'Tấn công bằng ống tiêm khổng lồ (Chemistry) hoặc súng laser (Gadget). Phạm vi đánh cực xa.',
        stances: [
          { name: 'Chemistry (c.5H)', damage: 70, guard: 'Mid', startup: 11, active: 5, recovery: 22, onBlock: -7, onHit: -2 },
          { name: 'Gadget (g.5H)', damage: 80, guard: 'Mid', startup: 20, active: 3, recovery: 23, onBlock: -4, onHit: 1 }
        ]
      },
      {
        id: 40,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '2L',
        move_type: 'normal',
        version: 'Chemistry / Gadget',
        DAMAGE: 30,
        guard: 'Low',
        START_UP: 6,
        ACTIVE: 3,
        RECOVERY: 8,
        ADV_ON_BLOCK: 1,
        ADV_ON_HIT: 4,
        INVULNERABILITY: 'None',
        properties: 'Bắt buộc đỡ ngồi (Low). Cộng lợi thế khung khi bị chặn (+1 on block).',
        description: 'Đòn gạt chân nhanh tạo sức ép mix-up hiệu quả cao.',
        stances: [
          { name: 'Chemistry (c.2L)', damage: 30, guard: 'Low', startup: 6, active: 3, recovery: 8, onBlock: 1, onHit: 4 },
          { name: 'Gadget (g.2L)', damage: 30, guard: 'Low', startup: 6, active: 3, recovery: 8, onBlock: 1, onHit: 4 }
        ]
      },
      {
        id: 41,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '2M',
        move_type: 'normal',
        version: 'Chemistry / Gadget',
        DAMAGE: 55,
        guard: 'Low',
        START_UP: 9,
        ACTIVE: 4,
        RECOVERY: 16,
        ADV_ON_BLOCK: -4,
        ADV_ON_HIT: 2,
        INVULNERABILITY: 'None',
        properties: 'Low attack. Tầm với tốt hơn 2L.',
        description: 'Đòn quét tầm trung dưới chân, dùng để bắt đối thủ đứng đỡ.',
        stances: [
          { name: 'Chemistry (c.2M)', damage: 55, guard: 'Low', startup: 9, active: 4, recovery: 16, onBlock: -4, onHit: 2 },
          { name: 'Gadget (g.2M)', damage: 55, guard: 'Low', startup: 9, active: 4, recovery: 16, onBlock: -4, onHit: 2 }
        ]
      },
      {
        id: 42,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '2H',
        move_type: 'normal',
        version: 'Chemistry / Gadget',
        DAMAGE: 85,
        guard: 'Low',
        START_UP: 12,
        ACTIVE: 5,
        RECOVERY: 24,
        ADV_ON_BLOCK: -11,
        ADV_ON_HIT: 8,
        INVULNERABILITY: 'Anti-Air (Frame 4-12)',
        properties: 'Hất tung đối phương trên không. Kháng đòn nhảy từ frame 4.',
        description: 'Vũ khí chống nhảy (Anti-Air) chủ lực của Koyori.',
        stances: [
          { name: 'Chemistry (c.2H)', damage: 85, guard: 'Low', startup: 12, active: 5, recovery: 24, onBlock: -11, onHit: 8 },
          { name: 'Gadget (g.2H)', damage: 85, guard: 'Low', startup: 13, active: 5, recovery: 23, onBlock: -10, onHit: 9 }
        ]
      },
      {
        id: 43,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '3H (Overhead)',
        move_type: 'command_normal',
        version: 'Universal',
        DAMAGE: 70,
        guard: 'Overhead',
        START_UP: 22,
        ACTIVE: 4,
        RECOVERY: 18,
        ADV_ON_BLOCK: -4,
        ADV_ON_HIT: 4,
        INVULNERABILITY: 'Low invul (F8-20)',
        properties: 'Bắt buộc đối phương phải đỡ đứng (Overhead). An toàn khi bị chặn (-4).',
        description: 'Đòn đánh qua đầu phá thế phòng thủ ngồi của đối thủ.',
        stances: [
          { name: 'Standard (3H)', damage: 70, guard: 'Overhead', startup: 22, active: 4, recovery: 18, onBlock: -4, onHit: 4 }
        ]
      },
      {
        id: 44,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: 'j.5L',
        move_type: 'normal',
        version: 'Air',
        DAMAGE: 40,
        guard: 'Overhead',
        START_UP: 5,
        ACTIVE: 4,
        RECOVERY: 10,
        ADV_ON_BLOCK: 0,
        ADV_ON_HIT: 3,
        INVULNERABILITY: 'None',
        properties: 'Đòn không chiến nhanh nhất.',
        description: 'Dùng khi nhảy vào áp sát hoặc tranh chấp trên không.',
        stances: [
          { name: 'Jumping Light (j.5L)', damage: 40, guard: 'Overhead', startup: 5, active: 4, recovery: 10, onBlock: 0, onHit: 3 }
        ]
      },
      {
        id: 45,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: 'Throw (Ground Grab)',
        move_type: 'throw',
        version: 'Universal',
        DAMAGE: 120,
        guard: 'Throw',
        START_UP: 4,
        ACTIVE: 2,
        RECOVERY: 28,
        ADV_ON_BLOCK: 0,
        ADV_ON_HIT: 20,
        INVULNERABILITY: 'None',
        properties: 'Không thể đỡ. Gây trạng thái Hard Knockdown.',
        description: 'Vật đối phương xuống sàn, chuyển stance hoặc thiết lập bẫy okizeme.',
        stances: [
          { name: 'Ground Throw (4/6 + L+M)', damage: 120, guard: 'Throw', startup: 4, active: 2, recovery: 28, onBlock: 0, onHit: 20 }
        ]
      },
      {
        id: 46,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '236L/M/H (Potion Toss)',
        move_type: 'special',
        version: 'Projectile',
        DAMAGE: 80,
        guard: 'Mid',
        START_UP: 15,
        ACTIVE: 6,
        RECOVERY: 21,
        ADV_ON_BLOCK: 2,
        ADV_ON_HIT: 5,
        INVULNERABILITY: 'None',
        properties: 'Lưu lại vết hóa chất trên sàn. Bản EX tốn 1 Star bar bắn 3 bình liên tiếp.',
        description: 'Chiêu thức zoner kiểm soát đường đi của đối thủ từ xa.',
        stances: [
          { name: 'Potion Light (236L)', damage: 70, guard: 'Mid', startup: 14, active: 6, recovery: 21, onBlock: 1, onHit: 4 },
          { name: 'Potion Medium (236M)', damage: 85, guard: 'Mid', startup: 16, active: 6, recovery: 22, onBlock: 2, onHit: 5 },
          { name: 'Potion Heavy/EX (236H)', damage: 120, guard: 'Mid', startup: 13, active: 10, recovery: 19, onBlock: 4, onHit: 8 }
        ]
      },
      {
        id: 47,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '214L/M/H (Flask Explosion)',
        move_type: 'special',
        version: 'Detonation',
        DAMAGE: 110,
        guard: 'Mid',
        START_UP: 18,
        ACTIVE: 5,
        RECOVERY: 24,
        ADV_ON_BLOCK: -3,
        ADV_ON_HIT: 12,
        INVULNERABILITY: 'None',
        properties: 'Kích nổ toàn bộ bình hóa học đang nằm trên sàn.',
        description: 'Tạo chuỗi sát thương bất ngờ khi đối thủ dẫm lên khu vực đã chuẩn bị sẵn.',
        stances: [
          { name: 'Explosion Normal (214X)', damage: 110, guard: 'Mid', startup: 18, active: 5, recovery: 24, onBlock: -3, onHit: 12 }
        ]
      },
      {
        id: 48,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: '623L/M/H (Ascending Reaction)',
        move_type: 'special',
        version: 'Reversal DP',
        DAMAGE: 130,
        guard: 'All',
        START_UP: 9,
        ACTIVE: 6,
        RECOVERY: 32,
        ADV_ON_BLOCK: -18,
        ADV_ON_HIT: 15,
        INVULNERABILITY: 'Full Invul (F1-9)',
        properties: 'Đòn Reversal chống ép sân. Kháng toàn bộ sát thương trong giai đoạn khởi đầu.',
        description: 'Koyori phóng vọt lên không trung mang theo vụ nổ ống nghiệm. Bất lợi lớn nếu bị chặn.',
        stances: [
          { name: 'Ascending Heavy (623H)', damage: 130, guard: 'All', startup: 9, active: 6, recovery: 32, onBlock: -18, onHit: 15 }
        ]
      },
      {
        id: 49,
        CHAR_NAME: 'Hakui Koyori',
        CHAR_MOVE: 'Super (Say Fan! - HoloX Lab)',
        move_type: 'super',
        version: 'Super Star',
        DAMAGE: 3500,
        guard: 'All',
        START_UP: 8,
        ACTIVE: 10,
        RECOVERY: 42,
        ADV_ON_BLOCK: -24,
        ADV_ON_HIT: 30,
        INVULNERABILITY: 'Full Invul (F1-12)',
        properties: 'Tiêu hao 2 Star Bars. Cắt cảnh hoạt họa HoloX Brains toàn màn hình.',
        description: 'Tuyệt kỹ tối thượng kết liễu trận đấu hoặc trừng phạt đòn đánh bất cẩn của đối phương.',
        stances: [
          { name: 'Say Fan! (Super 1)', damage: 3500, guard: 'All', startup: 8, active: 10, recovery: 42, onBlock: -24, onHit: 30 }
        ]
      }
    ]
  },
  'Shirakami Fubuki': {
    stats: { HP: 1000, WALKSPEED: 6, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: '22H (Kon Burst)' },
    moves: [
      { id: 1, CHAR_NAME: 'Fubuki', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 400, guard: 'Mid', START_UP: 5, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Self-Gatling Count: 2', description: 'Đòn chọc vuốt nhanh tầm gần.' },
      { id: 2, CHAR_NAME: 'Fubuki', CHAR_MOVE: '5M', move_type: 'normal', DAMAGE: 700, guard: 'Mid', START_UP: 8, ACTIVE: 4, RECOVERY: 14, ADV_ON_BLOCK: -4, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Có thể cancel sang Special', description: 'Đòn chém đuôi hồ ly tầm trung.' },
      { id: 3, CHAR_NAME: 'Fubuki', CHAR_MOVE: '5H', move_type: 'normal', DAMAGE: 1100, guard: 'Mid', START_UP: 12, ACTIVE: 5, RECOVERY: 19, ADV_ON_BLOCK: -6, ADV_ON_HIT: 4, INVULNERABILITY: 'None', properties: 'Tầm xa và sát thương cao', description: 'Kiếm băng hồ ly chém mạnh.' },
      { id: 4, CHAR_NAME: 'Fubuki', CHAR_MOVE: '2L', move_type: 'normal', DAMAGE: 350, guard: 'Low', START_UP: 6, ACTIVE: 2, RECOVERY: 8, ADV_ON_BLOCK: 1, ADV_ON_HIT: 3, INVULNERABILITY: 'Low hit', properties: 'Bắt buộc đỡ ngồi', description: 'Gạt chân nhanh mở combo.' },
      { id: 5, CHAR_NAME: 'Fubuki', CHAR_MOVE: '2M', move_type: 'normal', DAMAGE: 650, guard: 'Low', START_UP: 9, ACTIVE: 3, RECOVERY: 13, ADV_ON_BLOCK: -3, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Low poke', description: 'Đòn quét băng dưới chân đối phương.' },
      { id: 6, CHAR_NAME: 'Fubuki', CHAR_MOVE: '2H', move_type: 'normal', DAMAGE: 1000, guard: 'Low', START_UP: 11, ACTIVE: 6, RECOVERY: 22, ADV_ON_BLOCK: -10, ADV_ON_HIT: 8, INVULNERABILITY: 'Anti-Air (Frame 4)', properties: 'Anti-air launcher', description: 'Đòn hất tung chống nhảy.' },
      { id: 7, CHAR_NAME: 'Fubuki', CHAR_MOVE: '236L/M/H (Bite)', move_type: 'special', DAMAGE: 900, guard: 'Mid', START_UP: 13, ACTIVE: 4, RECOVERY: 17, ADV_ON_BLOCK: -5, ADV_ON_HIT: 4, INVULNERABILITY: 'None', properties: 'Đòn lướt cắn liên hoàn', description: 'Thu hẹp khoảng cách và duy trì nhịp độ tấn công.' },
      { id: 8, CHAR_NAME: 'Fubuki', CHAR_MOVE: '214L/M/H (Fox Dash)', move_type: 'special', DAMAGE: 1200, guard: 'Mid', START_UP: 16, ACTIVE: 4, RECOVERY: 20, ADV_ON_BLOCK: -2, ADV_ON_HIT: 6, INVULNERABILITY: 'Projectile invul (F6-12)', properties: 'Kháng đạn từ frame 6 đến 12', description: 'Lướt xuyên đạn tầm xa phản công đối thủ.' },
      { id: 9, CHAR_NAME: 'Fubuki', CHAR_MOVE: 'Super (Say Fan!)', move_type: 'super', DAMAGE: 3500, guard: 'All', START_UP: 9, ACTIVE: 8, RECOVERY: 34, ADV_ON_BLOCK: -20, ADV_ON_HIT: 30, INVULNERABILITY: 'Full invul (F1-11)', properties: 'Kháng toàn bộ sát thương F1-11', description: 'Bão tuyết hồ ly tột đỉnh.' }
    ]
  },
  'Inugami Korone': {
    stats: { HP: 1050, WALKSPEED: 5, JUMP_START_UP: 5, DASH_START_UP: 4, BACKDASH: 20, REVERSAL: '623H (Uppercut)' },
    moves: [
      { id: 10, CHAR_NAME: 'Korone', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 420, guard: 'Mid', START_UP: 6, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: 0, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Punch liên hoàn', description: 'Đấm nhanh cự ly gần.' },
      { id: 11, CHAR_NAME: 'Korone', CHAR_MOVE: '5M', move_type: 'normal', DAMAGE: 750, guard: 'Mid', START_UP: 9, ACTIVE: 4, RECOVERY: 12, ADV_ON_BLOCK: -2, ADV_ON_HIT: 4, INVULNERABILITY: 'None', properties: 'Móc ngang', description: 'Cú đấm móc uy lực.' },
      { id: 12, CHAR_NAME: 'Korone', CHAR_MOVE: '5H', move_type: 'normal', DAMAGE: 1200, guard: 'Mid', START_UP: 13, ACTIVE: 6, RECOVERY: 18, ADV_ON_BLOCK: -5, ADV_ON_HIT: 5, INVULNERABILITY: 'None', properties: 'Chém búa tạ', description: 'Đòn đánh gây choáng nặng.' },
      { id: 13, CHAR_NAME: 'Korone', CHAR_MOVE: '2H', move_type: 'normal', DAMAGE: 1050, guard: 'Low', START_UP: 10, ACTIVE: 5, RECOVERY: 24, ADV_ON_BLOCK: -12, ADV_ON_HIT: 7, INVULNERABILITY: 'Anti-Air', properties: 'Chống nhảy', description: 'Hất tung đối thủ trên không.' },
      { id: 14, CHAR_NAME: 'Korone', CHAR_MOVE: '623L/M/H (Dragon Punch)', move_type: 'special', DAMAGE: 1300, guard: 'All', START_UP: 8, ACTIVE: 6, RECOVERY: 28, ADV_ON_BLOCK: -18, ADV_ON_HIT: 12, INVULNERABILITY: 'Full invul on H', properties: 'Bất tử ở bản Heavy', description: 'Cú đấm thăng thiên bất khả xâm phạm.' }
    ]
  },
  'Tokino Sora': {
    stats: { HP: 1000, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: '623H (Rising Mic)' },
    moves: [
      { id: 15, CHAR_NAME: 'Sora', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 400, guard: 'Mid', START_UP: 5, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Mic poke', description: 'Chọc micro nhanh.' },
      { id: 16, CHAR_NAME: 'Sora', CHAR_MOVE: '5M', move_type: 'normal', DAMAGE: 700, guard: 'Mid', START_UP: 8, ACTIVE: 4, RECOVERY: 13, ADV_ON_BLOCK: -3, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Xoay mic', description: 'Quét micro tầm trung.' },
      { id: 17, CHAR_NAME: 'Sora', CHAR_MOVE: '236L/M/H (Note Shot)', move_type: 'special', DAMAGE: 800, guard: 'Mid', START_UP: 14, ACTIVE: 20, RECOVERY: 22, ADV_ON_BLOCK: -4, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Bắn nốt nhạc tầm xa', description: 'Đạn âm thanh zoner khống chế góc sàn.' },
      { id: 18, CHAR_NAME: 'Sora', CHAR_MOVE: '623L/M/H (Rising Mic)', move_type: 'special', DAMAGE: 1200, guard: 'All', START_UP: 7, ACTIVE: 5, RECOVERY: 30, ADV_ON_BLOCK: -22, ADV_ON_HIT: 10, INVULNERABILITY: 'Full invul', properties: 'Đòn Reversal thần thánh', description: 'Lao thẳng lên trời với luồng năng lượng thần tượng.' }
    ]
  },
  'Nakiri Ayame': {
    stats: { HP: 950, WALKSPEED: 6, JUMP_START_UP: 4, DASH_START_UP: 3, BACKDASH: 17, REVERSAL: '236H (Demon Slash)' },
    moves: [
      { id: 19, CHAR_NAME: 'Ayame', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 400, guard: 'Mid', START_UP: 5, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Chém song kiếm', description: 'Đòn chém kiếm quỷ nhanh.' },
      { id: 20, CHAR_NAME: 'Ayame', CHAR_MOVE: '5M', move_type: 'normal', DAMAGE: 750, guard: 'Mid', START_UP: 8, ACTIVE: 4, RECOVERY: 14, ADV_ON_BLOCK: -3, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Chém chéo', description: 'Đòn chém mở rộng tầm đánh.' },
      { id: 21, CHAR_NAME: 'Ayame', CHAR_MOVE: '236L/M/H (Demon Slash)', move_type: 'special', DAMAGE: 1350, guard: 'Mid', START_UP: 11, ACTIVE: 5, RECOVERY: 21, ADV_ON_BLOCK: -7, ADV_ON_HIT: 5, INVULNERABILITY: 'None', properties: 'Lướt chém xuyên thấu', description: 'Lao vụt qua người đối phương chém liên hoàn.' }
    ]
  },
  'Hoshimachi Suisei': {
    stats: { HP: 950, WALKSPEED: 5, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 19, REVERSAL: '22H (Meteor Cleave)' },
    moves: [
      { id: 22, CHAR_NAME: 'Suisei', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 380, guard: 'Mid', START_UP: 6, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Chém rìu nhanh', description: 'Đòn mở nhịp rìu cận chiến.' },
      { id: 23, CHAR_NAME: 'Suisei', CHAR_MOVE: '5H (Axe Smash)', move_type: 'normal', DAMAGE: 1300, guard: 'Mid', START_UP: 14, ACTIVE: 5, RECOVERY: 22, ADV_ON_BLOCK: -8, ADV_ON_HIT: 6, INVULNERABILITY: 'None', properties: 'Bổ rìu cực mạnh', description: 'Cú đập rìu gây chấn động mặt sàn.' },
      { id: 24, CHAR_NAME: 'Suisei', CHAR_MOVE: '214L/M/H (Comet Drop)', move_type: 'special', DAMAGE: 1100, guard: 'Overhead', START_UP: 18, ACTIVE: 6, RECOVERY: 20, ADV_ON_BLOCK: 2, ADV_ON_HIT: 7, INVULNERABILITY: 'None', properties: 'Đòn rơi từ không trung', description: 'Sao chổi bổ từ trên cao xuống phá đỡ ngồi.' }
    ]
  },
  'Kiryu Coco': {
    stats: { HP: 1150, WALKSPEED: 4, JUMP_START_UP: 6, DASH_START_UP: 6, BACKDASH: 22, REVERSAL: '632146H (Dragon Buster)' },
    moves: [
      { id: 25, CHAR_NAME: 'Coco', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 450, guard: 'Mid', START_UP: 7, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: 0, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Nắm đấm rồng', description: 'Cú đấm thẳng đầy uy lực.' },
      { id: 26, CHAR_NAME: 'Coco', CHAR_MOVE: '632146L/M/H (Dragon Grab)', move_type: 'throw', DAMAGE: 2200, guard: 'Throw', START_UP: 5, ACTIVE: 2, RECOVERY: 36, ADV_ON_BLOCK: 0, ADV_ON_HIT: 25, INVULNERABILITY: 'Armor on H', properties: 'Command Grab không thể đỡ', description: 'Bắt lấy đối phương và quật mạnh xuống đất.' }
    ]
  },
  'Aki Rosenthal': {
    stats: { HP: 1000, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: '236H' },
    moves: [
      { id: 27, CHAR_NAME: 'Aki', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 390, guard: 'Mid', START_UP: 6, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Đá nhanh', description: 'Cú đá nhử mở đường combo.' },
      { id: 28, CHAR_NAME: 'Aki', CHAR_MOVE: '5H', move_type: 'normal', DAMAGE: 1150, guard: 'Mid', START_UP: 13, ACTIVE: 5, RECOVERY: 18, ADV_ON_BLOCK: -4, ADV_ON_HIT: 4, INVULNERABILITY: 'None', properties: 'Dịch chuyển chớp nhoáng', description: 'Tấn công ma thuật từ khoảng cách xa.' }
    ]
  },
  'Shishiro Botan': {
    stats: { HP: 1000, WALKSPEED: 5, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 19, REVERSAL: '22H (Mine)' },
    moves: [
      { id: 29, CHAR_NAME: 'Botan', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 400, guard: 'Mid', START_UP: 6, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -1, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Báng súng cận chiến', description: 'Đập báng súng vào đối thủ.' },
      { id: 30, CHAR_NAME: 'Botan', CHAR_MOVE: '236L/M/H (Rifle Shot)', move_type: 'special', DAMAGE: 950, guard: 'Mid', START_UP: 15, ACTIVE: 3, RECOVERY: 24, ADV_ON_BLOCK: -5, ADV_ON_HIT: 4, INVULNERABILITY: 'None', properties: 'Bắn tỉa toàn màn hình', description: 'Bắn súng trường xuyên sàn đấu.' }
    ]
  },
  'Usada Pekora': {
    stats: { HP: 950, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 17, REVERSAL: '22H (TNT)' },
    moves: [
      { id: 31, CHAR_NAME: 'Pekora', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 380, guard: 'Mid', START_UP: 5, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Tát cà rốt', description: 'Đòn gõ cà rốt nhanh.' },
      { id: 32, CHAR_NAME: 'Pekora', CHAR_MOVE: '214L/M/H (Rocket)', move_type: 'special', DAMAGE: 1100, guard: 'Mid', START_UP: 16, ACTIVE: 6, RECOVERY: 22, ADV_ON_BLOCK: 1, ADV_ON_HIT: 5, INVULNERABILITY: 'None', properties: 'Bắn tên lửa nổ', description: 'Phóng tên lửa tự chế gây nổ văng đối phương.' }
    ]
  },
  'Kureiji Ollie': {
    stats: { HP: 950, WALKSPEED: 6, JUMP_START_UP: 4, DASH_START_UP: 3, BACKDASH: 16, REVERSAL: '22H' },
    moves: [
      { id: 33, CHAR_NAME: 'Ollie', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 410, guard: 'Mid', START_UP: 5, ACTIVE: 3, RECOVERY: 8, ADV_ON_BLOCK: 0, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Cào zombie', description: 'Cào xé chớp nhoáng.' },
      { id: 34, CHAR_NAME: 'Ollie', CHAR_MOVE: '236L/M/H (Wave)', move_type: 'special', DAMAGE: 1050, guard: 'Mid', START_UP: 13, ACTIVE: 5, RECOVERY: 19, ADV_ON_BLOCK: -3, ADV_ON_HIT: 4, INVULNERABILITY: 'None', properties: 'Sóng âm điên cuồng', description: 'Hét tạo sóng xung kích đẩy lùi kẻ địch.' }
    ]
  },
  "Ninomae Ina'nis": {
    stats: { HP: 950, WALKSPEED: 5, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 20, REVERSAL: '22S' },
    moves: [
      { id: 35, CHAR_NAME: 'Ina', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 380, guard: 'Mid', START_UP: 6, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Xúc tu gõ', description: 'Chạm xúc tu cận chiến.' },
      { id: 36, CHAR_NAME: 'Ina', CHAR_MOVE: '4M (Tentacle Poke)', move_type: 'command_normal', DAMAGE: 800, guard: 'Mid', START_UP: 11, ACTIVE: 4, RECOVERY: 17, ADV_ON_BLOCK: -4, ADV_ON_HIT: 3, INVULNERABILITY: 'None', properties: 'Tầm xa kiểm soát', description: 'Phóng xúc tu dài xuyên màn hình.' }
    ]
  },
  'Koseki Bijou': {
    stats: { HP: 1100, WALKSPEED: 4, JUMP_START_UP: 5, DASH_START_UP: 5, BACKDASH: 21, REVERSAL: '22H (Stone Rise)' },
    moves: [
      { id: 50, CHAR_NAME: 'Biboo', CHAR_MOVE: '5L', move_type: 'normal', DAMAGE: 420, guard: 'Mid', START_UP: 6, ACTIVE: 3, RECOVERY: 9, ADV_ON_BLOCK: -1, ADV_ON_HIT: 2, INVULNERABILITY: 'None', properties: 'Đá quý va đập', description: 'Đòn chọc bằng nắm đấm tinh thể.' },
      { id: 51, CHAR_NAME: 'Biboo', CHAR_MOVE: '5H (Pebble Slam)', move_type: 'normal', DAMAGE: 1350, guard: 'Mid', START_UP: 15, ACTIVE: 6, RECOVERY: 23, ADV_ON_BLOCK: -7, ADV_ON_HIT: 6, INVULNERABILITY: 'Armor on startup', properties: 'Có giáp siêu cứng lúc khởi đầu', description: 'Cú giáng đá tảng làm nứt sàn đấu.' }
    ]
  }
};

export function getFallbackDetails(charName) {
  if (!charName) return FALLBACK_CHARACTER_DETAILS['Hakui Koyori'];
  for (const [key, val] of Object.entries(FALLBACK_CHARACTER_DETAILS)) {
    if (charName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(charName.toLowerCase())) {
      return val;
    }
  }
  return FALLBACK_CHARACTER_DETAILS['Hakui Koyori'];
}
