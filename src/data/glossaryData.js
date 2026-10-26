export const INITIAL_GLOSSARY_TERMS = [
  // --- BASIC TERMS ---
  {
    id: 1,
    term: 'Startup (Khởi động)',
    level: 'basic',
    definition: 'Số khung hình (frames) từ lúc bạn bấm nút tung đòn đánh cho đến khung hình đầu tiên mà đòn đánh có thể gây sát thương lên đối thủ. Đòn đánh có Startup càng nhỏ thì ra đòn càng nhanh.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 2,
    term: 'Active (Hiệu lực)',
    level: 'basic',
    definition: 'Số khung hình mà đòn đánh duy trì vùng hitbox gây sát thương trên màn hình. Trong suốt các frame Active, nếu chạm vào hurtbox của đối thủ thì đòn đánh sẽ trúng đích.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 3,
    term: 'Recovery (Hồi chiêu / Thu chiêu)',
    level: 'basic',
    definition: 'Số khung hình sau khi hitbox tấn công kết thúc mà nhân vật cần có để thu hồi tư thế trở lại trạng thái trung lập (Neutral). Trong thời gian Recovery, bạn hoàn toàn không thể đỡ hoặc né tránh.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 4,
    term: 'Frame Advantage (Lợi thế khung hình / Plus/Minus)',
    level: 'basic',
    definition: 'Chênh lệch thời gian hồi phục giữa bạn và đối thủ sau khi một đòn đánh được đỡ hoặc đánh trúng.\n- Plus (+): Bạn hành động trước đối thủ, giữ quyền chủ động tấn công tiếp.\n- Minus (-): Đối thủ hồi phục trước bạn, bạn gặp bất lợi hoặc có thể bị trừng phạt (punish).',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 5,
    term: 'Hitstun & Blockstun',
    level: 'basic',
    definition: '- Hitstun: Trạng thái khựng / bất động của đối thủ khi bị trúng đòn.\n- Blockstun: Trạng thái khựng của đối thủ khi đỡ đòn thành công. Trong lúc bị blockstun, đối thủ không thể nhảy hoặc bấm đòn phản kháng.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 6,
    term: 'Punish (Trừng phạt)',
    level: 'basic',
    definition: 'Hành động tấn công trúng đối thủ khi họ đang trong giai đoạn Recovery của một đòn đánh bị hụt (whiff) hoặc bị đỡ đòn có độ bất lợi khung hình lớn (unsafe on block). Đòn trừng phạt không thể bị đỡ.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 7,
    term: 'Cancel (Hủy chiêu)',
    level: 'basic',
    definition: 'Kỹ thuật ngắt giai đoạn Recovery của một đòn đánh thường (Normal) để chuyển thẳng sang đòn đánh đặc biệt (Special Move) hoặc Super, giúp kéo dài chuỗi combo mượt mà.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },

  // --- ADVANCED TERMS ---
  {
    id: 8,
    term: 'Okizeme (Ép dậy / Wakeup Pressure)',
    level: 'advanced',
    definition: 'Chiến thuật tạo áp lực tấn công lên đối thủ ngay khi họ vừa bị ngã gục xuống sàn và đang trong quá trình đứng dậy. Người tấn công có lợi thế tuyệt đối về vị trí và thời gian ra đòn.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 9,
    term: 'Meaty (Đòn đánh gối đầu)',
    level: 'advanced',
    definition: 'Tung đòn tấn công sao cho khung hình Active trễ (late active frames) chạm vào đối thủ ngay tại frame đầu tiên họ vừa đứng dậy. Kỹ thuật này gia tăng lợi thế khung hình on block/hit và đè bẹp các đòn bấm nút phản kháng thông thường của đối thủ.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 10,
    term: 'Whiff Punish (Trừng phạt đòn đánh hụt)',
    level: 'advanced',
    definition: 'Quan sát cự ly di chuyển để đối thủ ra đòn đánh vào không khí (whiff), sau đó ngay lập tức tấn công vào phần hurtbox chìa ra hoặc lúc họ đang thu chiêu (recovery). Đây là kỹ năng tối thượng của lối chơi Footsies.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 11,
    term: 'Reversal (Đòn phản công tức thì)',
    level: 'advanced',
    definition: 'Thực hiện một đòn đánh (thường có tính chất bất tử - Invincible / Dragon Punch) ngay tại frame đầu tiên sau khi thoát khỏi trạng thái bị ngã (wakeup) hoặc thoát khỏi blockstun/hitstun.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 12,
    term: 'Option Select (OS - Lựa chọn tự động)',
    level: 'advanced',
    definition: 'Chuỗi nhập lệnh bao gồm nhiều thao tác kết hợp trong cùng một khoảng thời gian ngắn, để trò chơi tự động xử lý và tung ra hành động tối ưu nhất tùy theo phản ứng của đối thủ (ví dụ: đỡ nếu đối thủ ra đòn, hoặc ném nếu đối thủ đỡ).',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  },
  {
    id: 13,
    term: 'Fuzzy Guard (Phòng thủ mờ)',
    level: 'advanced',
    definition: 'Kỹ thuật phòng thủ chuyển đổi nhịp nhàng giữa đỡ đứng (đỡ đòn High/Overhead) và đỡ ngồi (đỡ đòn Low) theo đúng thời gian phản ứng có thể của đối phương, giúp vô hiệu hóa các pha phối hợp Mixup 50/50.',
    video_url: '',
    image_url: '',
    created_at: '2026-10-01'
  }
];
