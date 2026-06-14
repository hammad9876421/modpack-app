import useModpack from "../useModpack";

export default function VersionSelector() {
  const { minecraftVersion, setVersion } = useModpack();

  return (
    <div className="card">

      <h3>Minecraft Version</h3>

      <select
        value={minecraftVersion}
        onChange={(e) => setVersion(e.target.value)}
      >
        <option value="1.21.1">1.21.1</option>
        <option value="1.20.1">1.20.1</option>
        <option value="1.19.2">1.19.2</option>
        <option value="1.18.2">1.18.2</option>
      </select>

    </div>
  );
}
