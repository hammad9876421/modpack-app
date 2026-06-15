export default function SearchBar() {
  return (
    <div style={{ padding: 16 }}>
      <input
        placeholder="Search mods..."
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 18,
          border: "none",
          background: "#1f2937",
          color: "white",
          fontSize: 16,
        }}
      />
    </div>
  );
}
