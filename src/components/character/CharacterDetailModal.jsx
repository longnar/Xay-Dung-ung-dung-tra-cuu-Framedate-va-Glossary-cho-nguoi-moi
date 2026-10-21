import { useState, useEffect } from 'react';
import { characterApi } from '../../api/character.api';
import { getCharacterArt } from '../../utils/characterAssets';

export default function CharacterDetailModal({ character, isOpen, onClose, isAuthenticated, onUpdated }) {
  const [activeTab, setActiveTab] = useState('framedata'); // 'profile' | 'framedata'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingStats, setIsEditingStats] = useState(false);
  
  // Data states
  const [stats, setStats] = useState(null);
  const [moves, setMoves] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchMoveQuery, setSearchMoveQuery] = useState('');
  const [moveCategoryFilter, setMoveCategoryFilter] = useState('ALL');
  
  // Edit forms
  const [profileForm, setProfileForm] = useState({
    name: '', type: '', difficulty: 1, description: '', debut_date: ''
  });
  const [statsForm, setStatsForm] = useState({
    HP: 1000, WALKSPEED: 5, JUMP_START_UP: 4, DASH_START_UP: 4, BACKDASH: 18, REVERSAL: ''
  });
  
  // Move form modal
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [editingMove, setEditingMove] = useState(null);
  const [moveForm, setMoveForm] = useState({
    CHAR_NAME: '', CHAR_MOVE: '', DAMAGE: 500, START_UP: 6, ACTIVE: 3, RECOVERY: 10,
    ADV_ON_BLOCK: -2, ADV_ON_HIT: 2, INVULNERABILITY: 'None'
  });

  useEffect(() => {
    if (character && isOpen) {
      setProfileForm({
        name: character.name || '',
        type: character.type || '',
        difficulty: character.difficulty || 1,
        description: character.description || '',
        debut_date: character.debut_date ? character.debut_date.substring(0, 10) : ''
      });
      loadDetails(character.id);
    }
  }, [character, isOpen]);

  const loadDetails = async (id) => {
    setIsLoadingData(true);
    try {
      const data = await characterApi.get(id);
      const statsRes = data?.base_stats || data?.baseStats;
      const movesRes = data?.moves;
      setStats(statsRes || null);
      if (statsRes) {
        setStatsForm({
          HP: statsRes.HP ?? 1000,
          WALKSPEED: statsRes.WALKSPEED ?? 5,
          JUMP_START_UP: statsRes.JUMP_START_UP ?? 4,
          DASH_START_UP: statsRes.DASH_START_UP ?? 4,
          BACKDASH: statsRes.BACKDASH ?? 18,
          REVERSAL: statsRes.REVERSAL || ''
        });
      }
      setMoves(movesRes || []);
    } catch (err) {
      console.error('Error loading character details:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  if (!isOpen || !character) return null;

  const characterImage = getCharacterArt(character.name) || character.image_url;

  // Handle Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(profileForm).forEach(([key, val]) => {
        if (val !== undefined && val !== null) form.append(key, val);
      });
      await characterApi.update(character.id, form);
      setIsEditingProfile(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      alert('Không thể lưu thông tin: ' + err.message);
    }
  };

  // Handle Save Stats
  const handleSaveStats = async (e) => {
    e.preventDefault();
    try {
      await characterApi.saveBaseStats(character.id, statsForm);
      setStats({ ...statsForm });
      setIsEditingStats(false);
    } catch (err) {
      alert('Không thể lưu chỉ số: ' + err.message);
    }
  };

  // Handle Save Move
  const handleSaveMove = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...moveForm, CHAR_NAME: character.name };
      if (editingMove) {
        await characterApi.updateMove(character.id, editingMove.id, payload);
      } else {
        await characterApi.createMove(character.id, payload);
      }
      setIsMoveModalOpen(false);
      setEditingMove(null);
      loadDetails(character.id);
    } catch (err) {
      alert('Không thể lưu đòn đánh: ' + err.message);
    }
  };

  // Handle Delete Move
  const handleDeleteMove = async (moveId) => {
    if (!window.confirm('Bạn có chắc muốn xóa đòn đánh này?')) return;
    try {
      await characterApi.removeMove(character.id, moveId);
      setMoves((prev) => prev.filter((m) => m.id !== moveId));
      loadDetails(character.id);
    } catch (err) {
      if (err.message && err.message.includes('not found')) {
        setMoves((prev) => prev.filter((m) => m.id !== moveId));
      } else {
        alert('Không thể xóa đòn đánh: ' + err.message);
      }
    }
  };

  // Filter moves
  const filteredMoves = moves.filter((m) => {
    const matchesSearch = m.CHAR_MOVE.toLowerCase().includes(searchMoveQuery.toLowerCase()) ||
                          (m.INVULNERABILITY && m.INVULNERABILITY.toLowerCase().includes(searchMoveQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (moveCategoryFilter === 'ALL') return true;
    if (moveCategoryFilter === 'NORMAL') return /^[25][LMH]/i.test(m.CHAR_MOVE);
    if (moveCategoryFilter === 'SPECIAL') return /236|214|623|22|41236|632146/i.test(m.CHAR_MOVE) && !/super/i.test(m.CHAR_MOVE);
    if (moveCategoryFilter === 'SUPER') return /super/i.test(m.CHAR_MOVE);
    return true;
  });

  return (
    <div className="char-modal-backdrop" onClick={onClose}>
      <div className="char-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="char-modal-header">
          <div className="char-header-title">
            <span className="char-badge-type">{character.type || 'Fighter'}</span>
            <h2>{character.name}</h2>
            <div className="char-difficulty" title={`Độ khó: ${character.difficulty}/5`}>
              {'⭐'.repeat(character.difficulty || 1)}
            </div>
          </div>
          <button type="button" className="char-close-btn" onClick={onClose} aria-label="Đóng">&times;</button>
        </header>

        {/* Tab navigation */}
        <nav className="char-modal-tabs">
          <button
            type="button"
            className={`char-tab-btn ${activeTab === 'framedata' ? 'active' : ''}`}
            onClick={() => setActiveTab('framedata')}
          >
            📊 Tra Cứu Frame Data ({moves.length} đòn đánh)
          </button>
          <button
            type="button"
            className={`char-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Thông Số & Hồ Sơ (Base Stats)
          </button>
        </nav>

        {/* Tab Content */}
        <div className="char-modal-body">
          {activeTab === 'profile' && (
            <div className="char-profile-view">
              <div className="char-profile-left">
                {characterImage && (
                  <div className="char-art-wrapper">
                    <img src={characterImage} alt={character.name} className="char-art-img" />
                  </div>
                )}
                <div className="char-profile-meta">
                  <p><strong>Ngày Debut:</strong> {character.debut_date ? new Date(character.debut_date).toLocaleDateString('vi-VN') : 'N/A'}</p>
                  <p><strong>Phong cách:</strong> {character.type || 'Chưa cập nhật'}</p>
                </div>
              </div>

              <div className="char-profile-right">
                {/* Bio Description */}
                <div className="char-card-box">
                  <div className="box-title-row">
                    <h3>Mô Tả & Phong Cách Chiến Đấu</h3>
                    {isAuthenticated && !isEditingProfile && (
                      <button type="button" className="btn-small edit-btn" onClick={() => setIsEditingProfile(true)}>Sửa Profile</button>
                    )}
                  </div>
                  {isEditingProfile ? (
                    <form onSubmit={handleSaveProfile} className="char-edit-form">
                      <label>Tên nhân vật:</label>
                      <input value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} required />
                      <label>Phong cách chiến đấu (Type):</label>
                      <input value={profileForm.type} onChange={e => setProfileForm({ ...profileForm, type: e.target.value })} />
                      <label>Độ khó (1-5):</label>
                      <input type="number" min="1" max="5" value={profileForm.difficulty} onChange={e => setProfileForm({ ...profileForm, difficulty: parseInt(e.target.value) || 1 })} />
                      <label>Mô tả:</label>
                      <textarea rows="4" value={profileForm.description} onChange={e => setProfileForm({ ...profileForm, description: e.target.value })} />
                      <div className="form-actions">
                        <button type="submit" className="btn-primary">Lưu Profile</button>
                        <button type="button" className="btn-secondary" onClick={() => setIsEditingProfile(false)}>Hủy</button>
                      </div>
                    </form>
                  ) : (
                    <p className="char-description-text">{character.description || 'Chưa có thông tin mô tả chi tiết.'}</p>
                  )}
                </div>

                {/* Base Stats */}
                <div className="char-card-box">
                  <div className="box-title-row">
                    <h3>Thông Số Cơ Bản (Base Stats)</h3>
                    {isAuthenticated && !isEditingStats && (
                      <button type="button" className="btn-small edit-btn" onClick={() => setIsEditingStats(true)}>Sửa Stats</button>
                    )}
                  </div>

                  {isEditingStats ? (
                    <form onSubmit={handleSaveStats} className="char-edit-form stats-grid-form">
                      <div className="field">
                        <label>Máu (HP):</label>
                        <input type="number" value={statsForm.HP} onChange={e => setStatsForm({ ...statsForm, HP: parseInt(e.target.value) || 0 })} />
                      </div>
                      <div className="field">
                        <label>Tốc độ đi bộ (Walkspeed):</label>
                        <input type="number" value={statsForm.WALKSPEED} onChange={e => setStatsForm({ ...statsForm, WALKSPEED: parseInt(e.target.value) || 0 })} />
                      </div>
                      <div className="field">
                        <label>Jump Startup (Frame):</label>
                        <input type="number" value={statsForm.JUMP_START_UP} onChange={e => setStatsForm({ ...statsForm, JUMP_START_UP: parseInt(e.target.value) || 0 })} />
                      </div>
                      <div className="field">
                        <label>Dash Startup (Frame):</label>
                        <input type="number" value={statsForm.DASH_START_UP} onChange={e => setStatsForm({ ...statsForm, DASH_START_UP: parseInt(e.target.value) || 0 })} />
                      </div>
                      <div className="field">
                        <label>Backdash (Frame):</label>
                        <input type="number" value={statsForm.BACKDASH} onChange={e => setStatsForm({ ...statsForm, BACKDASH: parseInt(e.target.value) || 0 })} />
                      </div>
                      <div className="field full-width">
                        <label>Đòn Reversal / Kháng đòn:</label>
                        <input value={statsForm.REVERSAL} onChange={e => setStatsForm({ ...statsForm, REVERSAL: e.target.value })} placeholder="Ví dụ: 22H / 623H" />
                      </div>
                      <div className="form-actions full-width">
                        <button type="submit" className="btn-primary">Lưu Stats</button>
                        <button type="button" className="btn-secondary" onClick={() => setIsEditingStats(false)}>Hủy</button>
                      </div>
                    </form>
                  ) : (
                    <div className="char-stats-grid">
                      <div className="stat-card">
                        <span className="stat-label">❤️ Máu (HP)</span>
                        <span className="stat-value">{stats?.HP ?? 1000}</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">👟 Tốc độ (Walk)</span>
                        <span className="stat-value">{stats?.WALKSPEED ?? '5'}</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">🦘 Jump Startup</span>
                        <span className="stat-value">{stats?.JUMP_START_UP ?? '4'} F</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">💨 Dash Startup</span>
                        <span className="stat-value">{stats?.DASH_START_UP ?? '4'} F</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">🔙 Backdash</span>
                        <span className="stat-value">{stats?.BACKDASH ?? '18'} F</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">🛡️ Reversal</span>
                        <span className="stat-value reversal-text">{stats?.REVERSAL || 'Không có'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'framedata' && (
            <div className="char-framedata-view">
              {/* Filter and Search Bar */}
              <div className="fd-toolbar">
                <input
                  type="text"
                  placeholder="🔍 Tìm đòn đánh (5L, 236, Super, Anti-Air...)..."
                  value={searchMoveQuery}
                  onChange={(e) => setSearchMoveQuery(e.target.value)}
                  className="fd-search-input"
                />
                <div className="fd-category-filters">
                  <button type="button" className={`fd-filter-btn ${moveCategoryFilter === 'ALL' ? 'active' : ''}`} onClick={() => setMoveCategoryFilter('ALL')}>Tất cả ({moves.length})</button>
                  <button type="button" className={`fd-filter-btn ${moveCategoryFilter === 'NORMAL' ? 'active' : ''}`} onClick={() => setMoveCategoryFilter('NORMAL')}>Đòn thường</button>
                  <button type="button" className={`fd-filter-btn ${moveCategoryFilter === 'SPECIAL' ? 'active' : ''}`} onClick={() => setMoveCategoryFilter('SPECIAL')}>Tuyệt kỹ</button>
                  <button type="button" className={`fd-filter-btn ${moveCategoryFilter === 'SUPER' ? 'active' : ''}`} onClick={() => setMoveCategoryFilter('SUPER')}>Siêu tuyệt kỹ</button>
                </div>
                {isAuthenticated && (
                  <button
                    type="button"
                    className="btn-primary add-move-btn"
                    onClick={() => {
                      setEditingMove(null);
                      setMoveForm({
                        CHAR_NAME: character.name, CHAR_MOVE: '', DAMAGE: 600, START_UP: 6,
                        ACTIVE: 3, RECOVERY: 12, ADV_ON_BLOCK: -2, ADV_ON_HIT: 3, INVULNERABILITY: 'None'
                      });
                      setIsMoveModalOpen(true);
                    }}
                  >
                    + Thêm Đòn Đánh
                  </button>
                )}
              </div>

              {/* Explanatory note for beginners */}
              <div className="fd-beginner-hint">
                💡 <strong>Mẹo cho người mới:</strong> <em>Startup</em> là thời gian ra đòn (càng ít càng nhanh). <em>On Block</em>: số dương (xanh) nghĩa là bạn được đánh tiếp trước đối thủ; số âm (đỏ) nghĩa là đối thủ được đánh trước bạn khi họ chặn thành công.
              </div>

              {/* Frame Data Table */}
              <div className="fd-table-container">
                <table className="fd-table">
                  <thead>
                    <tr>
                      <th>Lệnh / Tên đòn</th>
                      <th title="Lượng sát thương gây ra">Damage</th>
                      <th title="Số frame trước khi đòn đánh xuất hiện">Startup</th>
                      <th title="Số frame duy trì hitbox gây sát thương">Active</th>
                      <th title="Số frame khựng lại sau đòn đánh">Recovery</th>
                      <th title="Chênh lệch frame khi đối thủ chặn đòn">On Block</th>
                      <th title="Chênh lệch frame khi đòn đánh trúng đối thủ">On Hit</th>
                      <th title="Đặc tính đặc biệt hoặc khả năng bất tử">Bất tử / Ghi chú</th>
                      {isAuthenticated && <th>Thao tác</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMoves.length === 0 ? (
                      <tr>
                        <td colSpan={isAuthenticated ? 9 : 8} className="text-center empty-cell">
                          {isLoadingData ? 'Đang tải bảng đòn đánh...' : 'Chưa có đòn đánh nào phù hợp.'}
                        </td>
                      </tr>
                    ) : (
                      filteredMoves.map((m) => {
                        const isPlusOnBlock = m.ADV_ON_BLOCK >= 0;
                        return (
                          <tr key={m.id}>
                            <td className="font-bold move-name-col">{m.CHAR_MOVE}</td>
                            <td>{m.DAMAGE ?? '-'}</td>
                            <td>{m.START_UP ? `${m.START_UP} F` : '-'}</td>
                            <td>{m.ACTIVE ? `${m.ACTIVE} F` : '-'}</td>
                            <td>{m.RECOVERY ? `${m.RECOVERY} F` : '-'}</td>
                            <td>
                              <span className={`frame-badge ${isPlusOnBlock ? 'positive' : 'negative'}`}>
                                {m.ADV_ON_BLOCK > 0 ? `+${m.ADV_ON_BLOCK}` : m.ADV_ON_BLOCK ?? 0}
                              </span>
                            </td>
                            <td>
                              <span className="frame-badge positive">
                                {m.ADV_ON_HIT > 0 ? `+${m.ADV_ON_HIT}` : m.ADV_ON_HIT ?? 0}
                              </span>
                            </td>
                            <td className="invul-col">{m.INVULNERABILITY || 'None'}</td>
                            {isAuthenticated && (
                              <td className="actions-col">
                                <button
                                  type="button"
                                  className="btn-tiny edit"
                                  onClick={() => {
                                    setEditingMove(m);
                                    setMoveForm({ ...m });
                                    setIsMoveModalOpen(true);
                                  }}
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  className="btn-tiny delete"
                                  onClick={() => handleDeleteMove(m.id)}
                                >
                                  Xóa
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Thêm / Sửa Move */}
        {isMoveModalOpen && (
          <div className="char-submodal-backdrop" onClick={() => setIsMoveModalOpen(false)}>
            <div className="char-submodal-content" onClick={e => e.stopPropagation()}>
              <h3>{editingMove ? 'Sửa Đòn Đánh' : 'Thêm Đòn Đánh Mới'}</h3>
              <form onSubmit={handleSaveMove} className="move-edit-form">
                <div className="form-row">
                  <label>Lệnh / Tên đòn (5L, 236H, Super...):</label>
                  <input value={moveForm.CHAR_MOVE} onChange={e => setMoveForm({ ...moveForm, CHAR_MOVE: e.target.value })} required />
                </div>
                <div className="form-row-grid">
                  <div>
                    <label>Sát thương (Damage):</label>
                    <input type="number" value={moveForm.DAMAGE} onChange={e => setMoveForm({ ...moveForm, DAMAGE: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label>Khởi động (Startup F):</label>
                    <input type="number" value={moveForm.START_UP} onChange={e => setMoveForm({ ...moveForm, START_UP: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label>Tác động (Active F):</label>
                    <input type="number" value={moveForm.ACTIVE} onChange={e => setMoveForm({ ...moveForm, ACTIVE: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label>Hồi (Recovery F):</label>
                    <input type="number" value={moveForm.RECOVERY} onChange={e => setMoveForm({ ...moveForm, RECOVERY: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label>On Block (Frame):</label>
                    <input type="number" value={moveForm.ADV_ON_BLOCK} onChange={e => setMoveForm({ ...moveForm, ADV_ON_BLOCK: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <label>On Hit (Frame):</label>
                    <input type="number" value={moveForm.ADV_ON_HIT} onChange={e => setMoveForm({ ...moveForm, ADV_ON_HIT: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div className="form-row">
                  <label>Đặc tính / Bất tử (Invulnerability):</label>
                  <input value={moveForm.INVULNERABILITY} onChange={e => setMoveForm({ ...moveForm, INVULNERABILITY: e.target.value })} placeholder="Ví dụ: Anti-Air, Projectile Invul, Full Invul..." />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Lưu Đòn Đánh</button>
                  <button type="button" className="btn-secondary" onClick={() => setIsMoveModalOpen(false)}>Hủy</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
