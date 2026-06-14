import useModpackManager from "./useModpackManager";

export default function ModpackPage() {
  const {
    modpacks,
    activePack,
    addPack,
    removePack,
    switchPack,
  } = useModpackManager();

  return (
    <div style={{ padding: "20px" }}>

      <h2>📦 Modpacks</h2>

      <button onClick={() => addPack("New Modpack")}>
        + Create Modpack
      </button>

      <hr />

      {modpacks.map((pack) => (
        <div
          key={pack.id}
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            cursor: "pointer",
            fontWeight:
              activePack?.id === pack.id ? "bold" : "normal",
          }}
          onClick={() => switchPack(pack.id)}
        >
          {pack.name}

          <button
            onClick={(e) => {
              e.stopPropagation();
              removePack(pack.id);
            }}
            style={{ marginLeft: "10px" }}
          >
            ❌
          </button>
        </div>
      ))}

      <hr />

      <div>
        <h3>Active Pack</h3>
        <pre>
          {JSON.stringify(activePack, null, 2)}
        </pre>
      </div>

    </div>
  );
}
