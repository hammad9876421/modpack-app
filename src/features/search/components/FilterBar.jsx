export default function FilterBar({ version, setVersion }) {
  return (
    <div>
      <select
        value={version}
        onChange={(e) => setVersion(e.target.value)}
      >
        <option value="">All Versions</option>
        <option value="1.21">1.21</option>
        <option value="1.20.1">1.20.1</option>
        <option value="1.19.2">1.19.2</option>
      </select>
    </div>
  );
}
