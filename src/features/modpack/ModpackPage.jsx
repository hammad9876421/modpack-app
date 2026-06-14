import ExportButton from "./components/ExportButton";
import ZipExportButton from "./components/ZipExportButton";
import VersionSelector from "./components/VersionSelector";
import LoaderSelector from "./components/LoaderSelector";
import ModpackMetaEditor from "./components/ModpackMetaEditor";
import { importModpack } from "./modpackImport";
import useModpack from "./useModpack";

export default function ModpackPage() {
  const {
    modpack,
    removeMod,
    clearModpack,
    setFullModpack,
  } = useModpack();

  return (
    <div className="page">

      <h2>🧩 Modpack Builder</h2>

      <ModpackMetaEditor />

      <VersionSelector />
      <LoaderSelector />

      <ExportButton />
      <ZipExportButton />

      <input
        type="file"
        accept="application/json"
        onChange={(e) =>
          importModpack(e.target.files[0], setFullModpack)
        }
      />

      {modpack.length === 0 && (
        <p>No mods in modpack yet</p>
      )}

      {modpack.map((mod) => (
        <div key={mod.id} className="card">

          <h3>{mod.title}</h3>

          <button onClick={() => removeMod(mod.id)}>
            Remove
          </button>

        </div>
      ))}

      {modpack.length > 0 && (
        <button onClick={clearModpack}>
          Clear Modpack
        </button>
      )}

    </div>
  );
}
