export function analyzePerformance(modpack) {
  const count = modpack?.mods?.length || 0;

  let ram = 2;

  if (count > 50) ram = 3;
  if (count > 100) ram = 4;
  if (count > 150) ram = 6;

  return {
    estimatedRamGB: ram,
    performance:
      ram <= 3
        ? "Excellent"
        : ram <= 4
        ? "Good"
        : "Heavy",
  };
}
