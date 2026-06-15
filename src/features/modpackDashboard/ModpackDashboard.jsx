import { useMemo } from "react";

export default function ModpackDashboard({ mods }) {
  const stats = useMemo(() => {
    const count = mods?.length || 0;

    const ram = Math.min(2 + count * 0.03, 8).toFixed(1);

    const health =
      count < 20
        ? 95
        : count < 50
        ? 85
        : count < 100
        ? 70
        : 55;

    return { count, ram, health };
  }, [mods]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Modpack Dashboard</h2>

      <div style={box}>
        <p>Mods: {stats.count}</p>
        <p>RAM: {stats.ram} GB</p>
        <p>Health: {stats.health}/100</p>
      </div>

      <div style={box}>
        <h3>Quick Suggestions</h3>
        <p>• Add JEI</p>
        <p>• Add FerriteCore</p>
        <p>• Optimize performance mods</p>
      </div>

      <button style={{ width: "100%", padding: 12 }}>
        Export Modpack
      </button>
    </div>
  );
}

const box = {
  background: "#1f2937",
  padding: 14,
  borderRadius: 12,
  marginBottom: 12,
};
