import useModpack from "../useModpack";
import { getModpackMeta } from "../modpackMeta";
import { buildModpackZip } from "../modpackZip";

export default function ZipExportButton() {
  const { modpack, minecraftVersion, loader } = useModpack();
  const meta = getModpackMeta();

  const handleExport = () => {
    buildModpackZip(modpack, meta, minecraftVersion, loader);
  };

  return (
    <button onClick={handleExport}>
      ⬇ Export ZIP Structure
    </button>
  );
}
