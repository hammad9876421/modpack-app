import useModpack from "../../modpack/useModpack";
import { addDownload } from "../../downloads/downloadEngine";

export default function ModCard({ mod, showToast }) {
  const { addModToActivePack } = useModpack();

  const handleAdd = () => {
    addModToActivePack({
      id: mod.id,
      title: mod.title,
      url: mod.url,
    });

    if (showToast) showToast("Added to modpack");
  };

  const handleDownload = () => {
    addDownload({
      id: mod.id,
      name: mod.title,
      url: mod.url,
    });

    if (showToast) showToast("Added to download queue");
  };

  return (
    <div className="mod-card">

      <h3>{mod.title}</h3>

      <p style={{ fontSize: "12px", opacity: 0.7 }}>
        {mod.author || "Unknown author"}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

        <button onClick={handleAdd}>
          ➕ Add to Modpack
        </button>

        <button onClick={handleDownload}>
          ⬇ Download
        </button>

      </div>

    </div>
  );
}
