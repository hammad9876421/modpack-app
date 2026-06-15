export function calculateHealth(modpack) {
  let score = 100;

  const mods = modpack?.mods || [];

  if (!modpack?.minecraftVersion) {
    score -= 15;
  }

  if (!modpack?.loader) {
    score -= 15;
  }

  if (mods.length === 0) {
    score -= 20;
  }

  return {
    score: Math.max(score, 0),
    status:
      score >= 90
        ? "Excellent"
        : score >= 75
        ? "Good"
        : score >= 50
        ? "Warning"
        : "Poor",
  };
}
