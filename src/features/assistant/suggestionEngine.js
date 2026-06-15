export function buildSuggestions(modpack) {
  const suggestions = [];

  const mods = modpack?.mods || [];

  if (!mods.find((m) => m.id === "jei")) {
    suggestions.push({
      id: "jei",
      reason: "Useful recipe viewer",
    });
  }

  if (!mods.find((m) => m.id === "jade")) {
    suggestions.push({
      id: "jade",
      reason: "Block information overlay",
    });
  }

  if (!mods.find((m) => m.id === "ferritecore")) {
    suggestions.push({
      id: "ferritecore",
      reason: "Memory optimization",
    });
  }

  return suggestions;
}
