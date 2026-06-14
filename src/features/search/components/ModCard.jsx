import useModpack from "../../modpack/useModpack";

export default function ModCard({ mod, showToast }) {
  const { addMod } = useModpack();

  const handleAdd = () => {
    addMod({
      id: mod.id,
      title: mod.title,
      url: mod.project_url,
    });

    showToast("Added to modpack");
  };

  const handleDownload = () => {
    const url =
      mod.project_url ||
      mod.download_url ||
      mod.files?.[0]?.url;

    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.click();
    }

    showToast("Download started");
  };

  return (
    <div className="mod-card">

      <h3>{mod.title}</h3>

      <div className="mod-actions">

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
