export default function ModCard({
  mod,
  onAdd,
  onFavorite,
  isFavorite,
  onOpen,
}) {
  return (
    <div
      onClick={() => onOpen(mod)}
      style={{
        background: "#1f2937",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        cursor: "pointer",
      }}
    >
      <h3>{mod.name}</h3>

      <p style={{ color: "#9ca3af" }}>
        {mod.category}
      </p>

      <p>⬇ {mod.downloads}</p>

      <p>
        {mod.loader} • {mod.version}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(mod);
          }}
        >
          ➕ Add
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(mod);
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
