import { useState, useMemo } from 'react';
import brandIcon from '../../assets/branding/IdolShowdownIcon.png';
import selectionFrame from '../../assets/decorative/selection-frame.svg';
import selectionPolygon from '../../assets/decorative/selection-polygon.svg';
import { getCharacterArt, getCharacterTpArt } from '../../utils/characterAssets';
import { CHARACTER_SELECT_BUTTONS, FIGMA_BUTTON_CLUSTER } from '../../utils/characterButtons';
import CharacterDetailView from './CharacterDetailView';

// Thông tin mặc định cho 13 nhân vật chuẩn bị sẵn trường hợp database chưa có đủ
const DEFAULT_CHARACTERS_INFO = {
  fubuki: {
    id: 1,
    name: 'Shirakami Fubuki',
    type: 'Rushdown / Shoto',
    difficulty: 2,
    debut_date: '2018-06-01',
    description: 'Cáo tuyết tốc độ cao với các cú đá xoay, phi tiêu băng và khả năng combo trên không mượt mà.'
  },
  korone: {
    id: 2,
    name: 'Inugami Korone',
    type: 'Brawler / Pressure',
    difficulty: 3,
    debut_date: '2019-04-13',
    description: 'Chú chó võ sĩ với chuỗi đòn đấm liên hoàn uy lực và khả năng áp sát dồn ép đối thủ.'
  },
  sora: {
    id: 3,
    name: 'Tokino Sora',
    type: 'Balanced / Shoto',
    difficulty: 1,
    debut_date: '2017-09-07',
    description: 'Đại tiền bối Hololive với bộ kỹ năng công thủ toàn diện, lý tưởng cho người mới bắt đầu.'
  },
  ayame: {
    id: 4,
    name: 'Nakiri Ayame',
    type: 'Rushdown / Duelist',
    difficulty: 2,
    debut_date: '2018-09-03',
    description: 'Quỷ Oni song kiếm với những pha lướt chém thần tốc, công kích dồn dập khiến đối thủ choáng ngợp.'
  },
  suisei: {
    id: 5,
    name: 'Hoshimachi Suisei',
    type: 'Mixup / Duelist',
    difficulty: 4,
    debut_date: '2018-03-22',
    description: 'Idol sát thủ trang bị búa rìu sao băng, sở hữu những chuỗi combo biến hóa và đòn trừng phạt chí mạng.'
  },
  coco: {
    id: 6,
    name: 'Kiryu Coco',
    type: 'Grappler / Power',
    difficulty: 4,
    debut_date: '2019-12-28',
    description: 'Chủ tịch Rồng huyền thoại với các đòn vật uy lực khổng lồ và áp lực tầm gần đáng sợ.'
  },
  botan: {
    id: 7,
    name: 'Shishiro Botan',
    type: 'Zoner / Tactical',
    difficulty: 3,
    debut_date: '2020-08-14',
    description: 'Sư tử bắn tỉa thiện chiến áp đảo đối phương bằng súng trường, lựu đạn và chiến thuật cự ly xa.'
  },
  aki: {
    id: 8,
    name: 'Aki Rosenthal',
    type: 'Stance / Magic',
    difficulty: 4,
    debut_date: '2018-06-01',
    description: 'Thiếu nữ Siren uyển chuyển với vũ điệu thôi miên và phép thuật điều khiển bím tóc ma thuật.'
  },
  pekora: {
    id: 9,
    name: 'Usada Pekora',
    type: 'Trapper / Gimmick',
    difficulty: 4,
    debut_date: '2019-07-17',
    description: 'Thỏ điên mang theo kho vũ khí rocket và bẫy thuốc nổ TNT tạo nên thế trận bất ngờ.'
  },
  ina: {
    id: 10,
    name: "Ninomae Ina'nis",
    type: 'Zoner / Spacing',
    difficulty: 3,
    debut_date: '2020-09-13',
    description: 'Tư tế Cthulhu triệu hồi các xúc tu cổ đại để kiểm soát không gian võ đài từ xa.'
  },
  ollie: {
    id: 11,
    name: 'Kureiji Ollie',
    type: 'Rushdown / Berserker',
    difficulty: 3,
    debut_date: '2020-12-04',
    description: 'Nữ thần zombie siêu tốc với lối đánh cuồng loạn khó đoán và khả năng truy đuổi liên tục.'
  },
  koyori: {
    id: 12,
    name: 'Hakui Koyori',
    type: 'Zoner / Chemist',
    difficulty: 3,
    debut_date: '2021-11-28',
    description: 'Nhà nghiên cứu chó sói thông minh tạo hỗn loạn bằng các bình độc dược và vụ nổ hoá học.'
  },
  biboo: {
    id: 13,
    name: 'Koseki Bijou (Biboo)',
    type: 'Heavy / Counter',
    difficulty: 3,
    debut_date: '2023-07-30',
    description: 'Viên ngọc kiên cố với sức chống chịu phi thường cùng các đòn giáng đá sấm sét nặng trịch.'
  }
};

export default function CharacterSelectGrid({
  characters = [],
  selectedCharacter,
  onSelectCharacter,
  onOpenDetails,
  onAddNewCharacter,
  isAuthenticated,
  onBackHome
}) {
  // viewMode: 'diamond' (Màn hình chọn nhân vật Figma node 782:887) | 'showcase' (Màn hình chi tiết tướng Figma node 112:109)
  const [viewMode, setViewMode] = useState('diamond');
  const [hoveredButtonKey, setHoveredButtonKey] = useState(null);
  const [activeChar, setActiveChar] = useState(null);

  // Tìm kiếm thông tin character tương ứng từ danh sách prop characters (DB) hoặc fallback
  const resolveCharacter = (btnConfig) => {
    if (!btnConfig) return null;
    const fromProps = characters.find(
      (c) =>
        c.name?.toLowerCase().includes(btnConfig.shortName.toLowerCase()) ||
        btnConfig.name.toLowerCase().includes(c.name?.toLowerCase())
    );
    if (fromProps) return fromProps;
    return DEFAULT_CHARACTERS_INFO[btnConfig.key] || {
      id: btnConfig.key,
      name: btnConfig.name,
      type: 'Fighter',
      difficulty: 3,
      description: 'Nhân vật võ đài Idol Showdown'
    };
  };

  const currentChar = activeChar || selectedCharacter || resolveCharacter(CHARACTER_SELECT_BUTTONS[8]); // Default Fubuki
  const currentArt = currentChar ? (getCharacterTpArt(currentChar.name) || getCharacterArt(currentChar.name)) : null;

  const handleSlotClick = (btnConfig) => {
    const char = resolveCharacter(btnConfig);
    setActiveChar(char);
    if (onSelectCharacter) onSelectCharacter(char);
    setViewMode('showcase');
  };

  const handleSlotMouseEnter = (btnConfig) => {
    setHoveredButtonKey(btnConfig.key);
  };

  const handleSlotMouseLeave = () => {
    setHoveredButtonKey(null);
  };

  // Nếu đang ở chế độ xem chi tiết Frame Data toàn cảnh (Phương án A)
  if (viewMode === 'detail') {
    return (
      <CharacterDetailView
        character={currentChar}
        isAuthenticated={isAuthenticated}
        onBack={() => setViewMode('showcase')}
      />
    );
  }

  return (
    <main className="figma-selection-screen" aria-label="Màn hình chọn nhân vật Idol Showdown">
      {viewMode === 'diamond' ? (
        /* =========================================================
           FIGMA NODE 782:887: SELECTION SCREEN
           ========================================================= */
        <div className="figma-selection-stage">
          {/* Vùng chứa thiết kế chuẩn Figma (814.18px x 960.18px) */}
          <div className="figma-selection-box">
            {/* Hình thoi nền mờ khổng lồ trung tâm (Node 782:890: 814.18 x 814.18px xoay 45 độ, r: 25px) */}
            <div className="figma-central-diamond" aria-hidden="true" />

            {/* Logo Idol Showdown đỉnh trên (Node 782:891) - Click để về trang chủ */}
            <button
              type="button"
              className="figma-selection-logo-btn"
              onClick={onBackHome}
              aria-label="Quay lại trang chính"
              title="Quay lại Trang Chủ Idol Showdown"
            >
              <img src={brandIcon} alt="Idol Showdown" className="figma-selection-logo-img" />
            </button>

            {/* Cụm 13 nút bấm nhân vật (Node 782:892: Group 'Hovering Button' 528 x 597px) */}
            <div className="figma-button-cluster" aria-label="Lưới chọn nhân vật">
              {CHARACTER_SELECT_BUTTONS.map((btn) => {
                const isHovered = hoveredButtonKey === btn.key;
                // Tính toạ độ phần trăm chính xác theo kích thước cụm 528.06 x 597.05px
                const leftPercent = (btn.x / FIGMA_BUTTON_CLUSTER.width) * 100;
                const topPercent = (btn.y / FIGMA_BUTTON_CLUSTER.height) * 100;
                const widthPercent = (FIGMA_BUTTON_CLUSTER.buttonWidth / FIGMA_BUTTON_CLUSTER.width) * 100;

                return (
                  <button
                    type="button"
                    key={btn.key}
                    id={`btn-char-${btn.key}`}
                    className={`figma-char-slot ${isHovered ? 'is-hovered' : ''}`}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                    onClick={() => handleSlotClick(btn)}
                    onMouseEnter={() => handleSlotMouseEnter(btn)}
                    onMouseLeave={handleSlotMouseLeave}
                    onFocus={() => handleSlotMouseEnter(btn)}
                    onBlur={handleSlotMouseLeave}
                    aria-label={`Chọn nhân vật ${btn.name}`}
                    title={btn.name}
                  >
                    {/* Ảnh nút: Trạng thái Default & Hover với viền stroke 5px sắc nét từ asset */}
                    <img
                      src={isHovered ? btn.hoverImg : btn.defaultImg}
                      alt={btn.name}
                      className="figma-char-slot-img"
                      loading="eager"
                      draggable={false}
                    />
                  </button>
                );
              })}
            </div>

            {/* Nút Admin Thêm nhân vật (+) ở góc phải (Figma Node 672:891) */}
            {isAuthenticated && (
              <button
                type="button"
                className="figma-admin-add-btn"
                onClick={onAddNewCharacter}
                aria-label="Thêm nhân vật mới"
                title="Thêm Slot Nhân Vật Mới (Admin)"
              >
                +
              </button>
            )}
          </div>
        </div>
      ) : (
        /* =========================================================
           FIGMA NODE 112:109: CHARACTER SCREEN (e.g. Fubuki Screen)
           ========================================================= */
        <div className="figma-showcase-screen">
          {/* Nút quay lại màn hình chọn tướng */}
          <button
            type="button"
            className="figma-showcase-back-btn"
            onClick={() => setViewMode('diamond')}
            aria-label="Quay lại màn hình chọn tướng"
            title="Quay lại lưới chọn tướng"
          >
            ← Back
          </button>

          {/* Bố cục Showcase chi tiết */}
          <div className="figma-showcase-layout">
            {/* Khung bên trái: Thông tin cơ bản (Figma Node 112:111) */}
            <section className="figma-showcase-info-card">
              <div className="figma-showcase-decor" aria-hidden="true">
                <img className="figma-showcase-frame" src={selectionFrame} alt="" />
                <img className="figma-showcase-polygon" src={selectionPolygon} alt="" />
              </div>

              <div className="figma-showcase-text-content">
                <h2 className="figma-showcase-title">Thông tin cơ bản:</h2>
                <h3 className="figma-showcase-char-name">{currentChar?.name}</h3>

                <div className="figma-showcase-props">
                  <p>
                    <strong>Ngày debut :</strong>{' '}
                    {currentChar?.debut_date
                      ? new Date(currentChar.debut_date).toLocaleDateString('vi-VN')
                      : '05/05/2023'}
                  </p>
                  <p>
                    <strong>Mô tả :</strong>{' '}
                    {currentChar?.description || 'Bậc thầy chiến đấu của Hololive!'}
                  </p>
                  <p>
                    <strong>Phân loại :</strong> {currentChar?.type || 'well-rounded (shoto)'}
                  </p>
                  <p className="figma-showcase-difficulty">
                    <strong>Độ khó :</strong>{' '}
                    {'★'.repeat(currentChar?.difficulty || 1)}
                    {'☆'.repeat(Math.max(0, 5 - (currentChar?.difficulty || 1)))}
                  </p>
                </div>

                {/* Nút Chi Tiết mở Màn hình Frame Data toàn cảnh (Phương án A) */}
                <button
                  type="button"
                  className="figma-more-info-btn"
                  onClick={() => setViewMode('detail')}
                  aria-label="Xem chi tiết Frame Data"
                >
                  Chi Tiết
                </button>
              </div>
            </section>

            {/* Khung giữa: Tranh vẽ nhân vật kích thước lớn (Figma Node 122:13) */}
            <div className="figma-showcase-art-panel">
              {currentArt ? (
                <img src={currentArt} alt={currentChar?.name} className="figma-showcase-big-art" />
              ) : (
                <div className="figma-showcase-art-placeholder">{currentChar?.name}</div>
              )}
            </div>

            {/* Khung bên phải: Danh sách chuyển nhanh giữa các nhân vật */}
            <aside className="figma-showcase-sidebar-roster" aria-label="Danh sách nhân vật khác">
              {CHARACTER_SELECT_BUTTONS.map((btn) => {
                const char = resolveCharacter(btn);
                const isCur = currentChar && currentChar.name === char.name;
                return (
                  <button
                    type="button"
                    key={btn.key}
                    className={`figma-mini-slot ${isCur ? 'active' : ''}`}
                    onClick={() => {
                      setActiveChar(char);
                    }}
                    title={btn.name}
                  >
                    <img src={btn.defaultImg} alt={btn.name} />
                  </button>
                );
              })}
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}
