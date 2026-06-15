export default function ModQuickActions({
  mod,
  onAdd,
  onFavorite,
}) {
  if (!mod) return null;

  return (
    <div>
      <h2>{mod.name}</h2>

      <p>{mod.category}</p>

      <p>
        {mod.loader} • {mod.version}
      </p>

      <button
        style={{ width: "100%", marginTop: 12 }}
        onClick={() => onAdd(mod)}
      >
        ➕ Add to Modpack
      </button>

      <button
        style={{ width: "100%", marginTop: 10 }}
        onClick={() => onFavorite(mod)}
      >
        ❤️ Favorite
      </button>

      <button
        style={{ width: "100%", marginTop: 10 }}
      >
        📄 View Details
      </button>
    </div>
  );
}
