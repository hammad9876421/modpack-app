export default function LoaderFilter({ loader, setLoader }) {
  return (
    <div>
      <select
        value={loader}
        onChange={(e) => setLoader(e.target.value)}
      >
        <option value="">All Loaders</option>
        <option value="fabric">Fabric</option>
        <option value="forge">Forge</option>
        <option value="neoforge">NeoForge</option>
      </select>
    </div>
  );
}
