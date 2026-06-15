const categories = [
  "Performance",
  "Technology",
  "Adventure",
  "Magic",
  "Utility",
  "Library",
];

export default function CategoryChips() {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        gap: 10,
        padding: 16,
      }}
    >
      {categories.map((category) => (
        <button
          key={category}
          style={{
            background: "#1bd96a",
            color: "#111827",
            border: "none",
            padding: "10px 18px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            fontWeight: "bold",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
