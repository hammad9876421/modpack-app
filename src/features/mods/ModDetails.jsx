export default function ModDetails({
  mod,
  onBack,
  onAdd,
}) {
  if (!mod) return null;

  return (
    <div style={{ padding: 16 }}>
      <button onClick={onBack}>
        ← Back
      </button>

      <h1>{mod.name}</h1>

      <p style={{ color: "#9ca3af" }}>
        {mod.category}
      </p>

      <p>{mod.description}</p>

      <p>Loader: {mod.loader}</p>

      <p>Version: {mod.version}</p>

      <button
        onClick={() => onAdd(mod)}
        style={{
          marginTop: 20,
          padding: 12,
          width: "100%",
        }}
      >
        ➕ Add to Modpack
      </button>
    </div>
  );
}
