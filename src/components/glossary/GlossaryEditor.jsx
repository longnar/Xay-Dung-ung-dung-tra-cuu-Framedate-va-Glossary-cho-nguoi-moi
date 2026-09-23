export default function GlossaryEditor({ value, onChange, onSubmit, onCancel }) {
  return (
    <form className="data-form" onSubmit={onSubmit}>
      <input value={value.term} onChange={(event) => onChange({ ...value, term: event.target.value })} placeholder="Thuật ngữ" required />
      <textarea value={value.definition} onChange={(event) => onChange({ ...value, definition: event.target.value })} placeholder="Định nghĩa" required />
      <input value={value.video_url || ''} onChange={(event) => onChange({ ...value, video_url: event.target.value })} placeholder="Video URL (không bắt buộc)" />
      <input type="file" accept="image/*" onChange={(event) => onChange({ ...value, image: event.target.files[0] || null })} />
      <div className="admin-actions">
        <button type="submit" className="action-button save-button">{value.id ? 'Cập nhật' : 'Lưu'}</button>
        {value.id && <button type="button" className="action-button" onClick={onCancel}>Hủy</button>}
      </div>
    </form>
  )
}
