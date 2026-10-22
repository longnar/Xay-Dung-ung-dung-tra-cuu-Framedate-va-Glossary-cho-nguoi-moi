import { useState, useEffect, useMemo } from 'react';
import { api } from '../../api/client';
import { INITIAL_GLOSSARY_TERMS } from '../../data/glossaryData';
import './GlossaryStyles.css';

export default function GlossaryScreen({
  initialLevel = 'basic',
  isAuthenticated = false,
  onBackHome,
}) {
  const [activeLevel, setActiveLevel] = useState(initialLevel);
  const [glossaries, setGlossaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTermId, setActiveTermId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form state cho Admin
  const [formData, setFormData] = useState({
    id: null,
    term: '',
    definition: '',
    level: initialLevel,
    video_url: '',
    image: null,
    image_preview: '',
  });

  // Tải danh sách thuật ngữ từ Database (hoặc fallback nếu chưa có)
  const fetchGlossaries = async () => {
    setIsLoading(true);
    try {
      const data = await api.getGlossaries();
      if (Array.isArray(data) && data.length > 0) {
        setGlossaries(data);
      } else {
        setGlossaries(INITIAL_GLOSSARY_TERMS);
      }
    } catch {
      setGlossaries(INITIAL_GLOSSARY_TERMS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGlossaries();
  }, []);

  // Cập nhật level khi prop initialLevel thay đổi
  useEffect(() => {
    setActiveLevel(initialLevel);
    setIsEditing(false);
    setIsCreating(false);
  }, [initialLevel]);

  // Lọc danh sách thuật ngữ theo level hiện tại và từ khóa tìm kiếm
  const filteredTerms = useMemo(() => {
    const list = glossaries.filter((g) => (g.level || 'basic') === activeLevel);
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (g) =>
        (g.term && g.term.toLowerCase().includes(q)) ||
        (g.definition && g.definition.toLowerCase().includes(q))
    );
  }, [glossaries, activeLevel, searchQuery]);

  // Thuật ngữ đang được chọn
  const activeTerm = useMemo(() => {
    if (activeTermId) {
      const found = filteredTerms.find((t) => t.id === activeTermId);
      if (found) return found;
    }
    return filteredTerms[0] || null;
  }, [filteredTerms, activeTermId]);

  // Đổi mục chọn
  const handleSelectTerm = (term) => {
    setActiveTermId(term.id);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Mở form chỉnh sửa (Admin)
  const handleStartEdit = () => {
    if (!activeTerm) return;
    setFormData({
      id: activeTerm.id,
      term: activeTerm.term || '',
      definition: activeTerm.definition || '',
      level: activeTerm.level || activeLevel,
      video_url: activeTerm.video_url || '',
      image: null,
      image_preview: activeTerm.image_url || '',
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  // Mở form tạo mới (Admin)
  const handleStartCreate = () => {
    setFormData({
      id: null,
      term: '',
      definition: '',
      level: activeLevel,
      video_url: '',
      image: null,
      image_preview: '',
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  // Xóa thuật ngữ (Admin)
  const handleDeleteTerm = async () => {
    if (!activeTerm) return;
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa thuật ngữ "${activeTerm.term}"?`);
    if (!confirmDelete) return;

    try {
      await api.deleteGlossary(activeTerm.id);
    } catch {
      // Fallback local state nếu DB offline
      setGlossaries((prev) => prev.filter((item) => item.id !== activeTerm.id));
    }
    await fetchGlossaries();
    setIsEditing(false);
    setIsCreating(false);
  };

  // Xử lý lưu form (Thêm mới hoặc Cập nhật)
  const handleSaveForm = async (e) => {
    e.preventDefault();

    if (!formData.term.trim()) {
      alert('Vui lòng nhập tên thuật ngữ.');
      return;
    }
    if (!formData.definition.trim()) {
      alert('Vui lòng nhập định nghĩa thuật ngữ.');
      return;
    }

    const payload = new FormData();
    payload.append('term', formData.term.trim());
    payload.append('definition', formData.definition.trim());
    payload.append('level', formData.level || activeLevel);
    if (formData.video_url.trim()) {
      payload.append('video_url', formData.video_url.trim());
    }
    if (formData.image) {
      payload.append('image', formData.image);
    }

    try {
      if (isCreating) {
        const res = await api.createGlossary(payload);
        await fetchGlossaries();
        if (res?.glossary?.id) setActiveTermId(res.glossary.id);
      } else if (isEditing && activeTerm) {
        await api.updateGlossary(activeTerm.id, payload);
        await fetchGlossaries();
      }
    } catch (err) {
      // Fallback local update
      const localObj = {
        id: isCreating ? Date.now() : activeTerm.id,
        term: formData.term.trim(),
        definition: formData.definition.trim(),
        level: formData.level || activeLevel,
        video_url: formData.video_url.trim(),
        image_url: formData.image_preview || '',
        created_at: new Date().toISOString().substring(0, 10),
      };

      if (isCreating) {
        setGlossaries([localObj, ...glossaries]);
        setActiveTermId(localObj.id);
      } else {
        setGlossaries(glossaries.map((g) => (g.id === activeTerm.id ? { ...g, ...localObj } : g)));
      }
      console.warn('Lưu cục bộ do kết nối backend:', err.message);
    }

    setIsEditing(false);
    setIsCreating(false);
  };

  const handleCancelForm = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  return (
    <main className="figma-glossary-screen" aria-label="Màn hình tra cứu Glossary">
      {/* Nút Back quay lại trang danh mục Glossary */}
      <button
        type="button"
        className="figma-glossary-back-btn"
        onClick={() => {
          if (onBackHome) onBackHome();
        }}
        aria-label="Quay lại"
        title="Quay lại mục Glossary"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back</span>
      </button>

      {/* Khung tổng thể kính mờ */}
      <section className="figma-glossary-container">
        {/* CỘT TRÁI: DANH SÁCH THUẬT NGỮ */}
        <aside className="figma-glossary-sidebar" aria-label="Danh sách các thuật ngữ">
          <div className="figma-glossary-sidebar-header">
            <h2 className="figma-glossary-sidebar-title">
              <span>{activeLevel === 'basic' ? 'Basic Glossary' : 'Advanced Glossary'}</span>
            </h2>

            {/* Nút thêm mới danh cho Admin */}
            {isAuthenticated && (
              <button
                type="button"
                className="figma-glossary-add-btn"
                onClick={handleStartCreate}
                title="Thêm thuật ngữ mới"
              >
                + Thêm
              </button>
            )}
          </div>

          {/* Bộ chuyển tab nhanh giữa Basic và Advanced */}
          <div className="figma-glossary-level-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeLevel === 'basic'}
              className={`figma-glossary-tab-btn ${activeLevel === 'basic' ? 'active' : ''}`}
              onClick={() => {
                setActiveLevel('basic');
                setIsEditing(false);
                setIsCreating(false);
              }}
            >
              Cơ Bản (Basic)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeLevel === 'advanced'}
              className={`figma-glossary-tab-btn ${activeLevel === 'advanced' ? 'active' : ''}`}
              onClick={() => {
                setActiveLevel('advanced');
                setIsEditing(false);
                setIsCreating(false);
              }}
            >
              Nâng Cao (Advanced)
            </button>
          </div>

          {/* Thanh tìm kiếm trực tiếp */}
          <div className="figma-glossary-search-wrap">
            <input
              type="text"
              className="figma-glossary-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm thuật ngữ..."
              aria-label="Tìm kiếm thuật ngữ"
            />
          </div>

          {/* Danh sách cuộn thuật ngữ */}
          <div className="figma-glossary-list" role="tablist">
            {isLoading && glossaries.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                Đang tải dữ liệu...
              </div>
            ) : (
              filteredTerms.map((item) => {
                const isActive = activeTerm?.id === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`figma-glossary-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectTerm(item)}
                  >
                    <div className="figma-glossary-item-title">
                      <span>{item.term}</span>
                    </div>
                    {item.definition && (
                      <div className="figma-glossary-item-preview">{item.definition}</div>
                    )}
                  </button>
                );
              })
            )}

            {!isLoading && filteredTerms.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                Không tìm thấy thuật ngữ nào.
              </div>
            )}
          </div>
        </aside>

        {/* CỘT PHẢI: CHI TIẾT THUẬT NGỮ HOẶC FORM SOẠN THẢO */}
        <article className="figma-glossary-content-panel">
          {isEditing || isCreating ? (
            /* Chế độ soạn thảo Admin */
            <form className="figma-glossary-form" onSubmit={handleSaveForm}>
              <div className="figma-glossary-form-grid">
                <div className="figma-glossary-field">
                  <label className="figma-glossary-label" htmlFor="glossary-term-input">
                    Tên thuật ngữ
                  </label>
                  <input
                    id="glossary-term-input"
                    type="text"
                    className="figma-glossary-input"
                    value={formData.term}
                    onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                    placeholder="VD: Okizeme, Startup, Meaty..."
                    required
                  />
                </div>

                <div className="figma-glossary-field">
                  <label className="figma-glossary-label" htmlFor="glossary-level-select">
                    Cấp độ (Level)
                  </label>
                  <select
                    id="glossary-level-select"
                    className="figma-glossary-select"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <option value="basic">Cơ bản (Basic)</option>
                    <option value="advanced">Nâng cao (Advanced)</option>
                  </select>
                </div>
              </div>

              <div className="figma-glossary-form-grid">
                <div className="figma-glossary-field">
                  <label className="figma-glossary-label" htmlFor="glossary-video-input">
                    Video URL minh họa (Không bắt buộc)
                  </label>
                  <input
                    id="glossary-video-input"
                    type="url"
                    className="figma-glossary-input"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="figma-glossary-field">
                  <label className="figma-glossary-label" htmlFor="glossary-image-file">
                    Hình ảnh minh họa
                  </label>
                  <input
                    id="glossary-image-file"
                    type="file"
                    accept="image/*"
                    className="figma-glossary-file-input"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({
                          ...formData,
                          image: file,
                          image_preview: URL.createObjectURL(file),
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="figma-glossary-field" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="figma-glossary-label" htmlFor="glossary-def-textarea">
                  Định nghĩa &amp; Hướng dẫn chi tiết
                </label>
                <textarea
                  id="glossary-def-textarea"
                  className="figma-glossary-textarea"
                  value={formData.definition}
                  onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                  placeholder="Nhập định nghĩa, cách áp dụng trong game, lưu ý khi thi đấu..."
                  rows={10}
                  required
                />
              </div>

              <div className="figma-glossary-form-actions">
                <button type="button" className="figma-glossary-btn-cancel" onClick={handleCancelForm}>
                  Hủy
                </button>
                <button type="submit" className="figma-glossary-btn-save">
                  {isCreating ? 'Đăng' : 'Lưu'}
                </button>
              </div>
            </form>
          ) : (
            /* Chế độ xem chi tiết thuật ngữ */
            activeTerm && (
              <>
                <header className="figma-glossary-article-header">
                  <div className="figma-glossary-article-title-wrap">
                    <h1 className="figma-glossary-article-title">{activeTerm.term}</h1>
                    <div className="figma-glossary-article-meta">
                      <span className={`figma-glossary-badge ${activeTerm.level || 'basic'}`}>
                        {activeTerm.level === 'advanced' ? 'Nâng cao' : 'Cơ bản'}
                      </span>
                      {activeTerm.created_at && (
                        <span>Ngày cập nhật: {String(activeTerm.created_at).substring(0, 10)}</span>
                      )}
                    </div>
                  </div>

                  {/* Thanh công cụ Admin */}
                  {isAuthenticated && (
                    <div className="figma-glossary-admin-actions">
                      <button
                        type="button"
                        className="figma-glossary-btn-edit"
                        onClick={handleStartEdit}
                        title="Chỉnh sửa thuật ngữ"
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="figma-glossary-btn-delete"
                        onClick={handleDeleteTerm}
                        title="Xóa thuật ngữ"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </header>

                <div className="figma-glossary-body-scroll">
                  <p className="figma-glossary-body-text">{activeTerm.definition}</p>

                  {/* Video URL minh họa */}
                  {activeTerm.video_url && (
                    <div className="figma-glossary-media-box">
                      <h3 className="figma-glossary-media-title">Video minh họa:</h3>
                      <a
                        href={activeTerm.video_url}
                        target="_blank"
                        rel="noreferrer"
                        className="figma-glossary-video-link"
                      >
                        <span>&bull; Mở liên kết video hướng dẫn</span>
                      </a>
                    </div>
                  )}

                  {/* Hình ảnh minh họa */}
                  {activeTerm.image_url && (
                    <div className="figma-glossary-media-box">
                      <h3 className="figma-glossary-media-title">Ảnh minh họa:</h3>
                      <img
                        src={activeTerm.image_url}
                        alt={`Minh họa ${activeTerm.term}`}
                        className="figma-glossary-media-img"
                      />
                    </div>
                  )}
                </div>
              </>
            )
          )}
        </article>
      </section>
    </main>
  );
}
