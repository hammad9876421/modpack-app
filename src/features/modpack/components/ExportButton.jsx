import useModpackStore from "../modpackStore";

export default function ExportButton() {
  const { modpack } = useModpackStore();

  const exportModpack = () => {
    const data = {
      name: "My Modpack",
      createdAt: new Date().toISOString(),
      mods: modpack,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "modpack.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportModpack}>
      ⬇ Export Modpack
    </button>
  );
}
