const mods = [
  "Create",
  "JEI",
  "Sodium",
  "JourneyMap",
];

export default function TrendingSection() {
  return (
    <div style={{ padding: 16 }}>
      <h2>🔥 Trending</h2>

      {mods.map((mod) => (
        <div
          key={mod}
          style={{
            marginTop: 12,
            padding: 14,
            borderRadius: 14,
            background: "#1f2937",
          }}
        >
          {mod}
        </div>
      ))}
    </div>
  );
}
