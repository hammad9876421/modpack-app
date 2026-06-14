import useModpack from "../useModpack";

export default function LoaderSelector() {
  const { loader, setLoaderType } = useModpack();

  return (
    <div className="card">

      <h3>Mod Loader</h3>

      <select
        value={loader}
        onChange={(e) => setLoaderType(e.target.value)}
      >
        <option value="fabric">Fabric</option>
        <option value="forge">Forge</option>
        <option value="neoforge">NeoForge</option>
      </select>

    </div>
  );
}
