export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search mods..."
      />

      <button onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
