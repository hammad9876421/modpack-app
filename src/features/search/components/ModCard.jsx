import useModpack from "../../modpack/useModpack";

export default function ModCard({ mod, showToast }) {
  const { addMod } = useModpack();

  const handleAdd = () => {
    const result = addMod({
      id: mod.id,
      title: mod.title,
      url: mod.url,
    });

    if (showToast) {
      showToast(result.message);
    }
  };

  const handleDownload = () => {
    const url =
      mod.url ||
      mod.project_url ||
      mod.download_url ||
      mod.files?.[0]?.url;

    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.click();
    }

    if (showToast) {
      showToast("Download started");
    }
  };

  return (
    <div className="mod-card">

      <h3>{mod.title}</h3>

      <p style={{ fontSize: "12px", opacity: 0.7 }}>
        {mod.author || "Unknown"}
      </p>

      <div style={{ display: "flex", gap: "10px" }}>

        <button onClick={handleAdd}>
          ➕ Add
        </button>

        <button onClick={handleDownload}>
          ⬇ Download
        </button>

      </div>

    </div>
  );
}
