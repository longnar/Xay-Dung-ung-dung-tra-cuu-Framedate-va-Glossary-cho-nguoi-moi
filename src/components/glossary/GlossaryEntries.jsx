export default function GlossaryEntries({ entries, isLoading, onEdit, onDelete }) {
  return (
    <div className="data-list">
      {isLoading && <p>Đang tải dữ liệu...</p>}
      {!isLoading && entries.length === 0 && <p>Chưa có dữ liệu.</p>}
      {entries.map((entry) => (
        <article className="data-list-item" key={entry.id}>
          <strong>{entry.term}</strong>
          <span>{entry.definition}</span>
          <div>
            {onEdit && <button type="button" onClick={() => onEdit(entry)}>Sửa</button>}
            {onDelete && <button type="button" onClick={() => onDelete(entry.id)}>Xóa</button>}
          </div>
        </article>
      ))}
    </div>
  )
}
