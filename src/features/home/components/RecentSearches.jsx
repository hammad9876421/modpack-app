const searches = [
  "Create",
  "JEI",
  "AppleSkin",
];

export default function RecentSearches() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Recent Searches</h2>

      {searches.map((item) => (
        <div
          key={item}
          style={{
            marginTop: 10,
            color: "#9ca3af",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
