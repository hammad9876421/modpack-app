import { LOADERS } from "../engine/versionEngine.js";

/* ---------------- BASIC KNOWLEDGE BASE ---------------- */

const QOL_MODS = [
  "jei",
  "rei",
  "appleskin",
  "journeymap",
  "xaeros-minimap",
];

const PERFORMANCE_MODS = [
  "sodium",
  "lithium",
  "ferritecore",
  "starlight",
  "entityculling",
];

/* ---------------- DEPENDENCY CHECK ---------------- */

export function detectMissingDependencies(modpack) {
  if (!modpack?.mods) return [];

  const missing = [];

  modpack.mods.forEach((mod) => {
    if (mod.id === "create") {
      const hasFlywheel = modpack.mods.some((m) =>
        m.id.includes("flywheel")
      );

      if (!hasFlywheel) {
        missing.push({
          type: "dependency",
          mod: "flywheel",
          reason: "Required by Create",
        });
      }
    }
  });

  return missing;
}

/* ---------------- CONFLICT DETECTION ---------------- */

export function detectConflicts(modpack) {
  const issues = [];

  if (!modpack) return issues;

  const loader = modpack.loader;
  const version = modpack.mcVersion;

  if (!LOADERS.includes(loader)) {
    issues.push({
      type: "loader",
      message: "Invalid loader selected",
    });
  }

  const hasForgeMods = modpack.mods?.some((m) =>
    m.loaders?.includes("forge")
  );

  const hasFabricMods = modpack.mods?.some((m) =>
    m.loaders?.includes("fabric")
  );

  if (hasForgeMods && hasFabricMods) {
    issues.push({
      type: "conflict",
      message: "Forge + Fabric mods mixed in same pack",
    });
  }

  if (!version) {
    issues.push({
      type: "version",
      message: "Minecraft version not set",
    });
  }

  return issues;
}

/* ---------------- SUGGESTIONS ---------------- */

export function suggestMods(modpack) {
  const suggestions = [];

  const installedIds = modpack?.mods?.map((m) => m.id) || [];

  QOL_MODS.forEach((mod) => {
    if (!installedIds.includes(mod)) {
      suggestions.push({
        type: "qol",
        id: mod,
        reason: "Improves gameplay experience",
      });
    }
  });

  PERFORMANCE_MODS.forEach((mod) => {
    if (!installedIds.includes(mod)) {
      suggestions.push({
        type: "performance",
        id: mod,
        reason: "Boosts FPS and performance",
      });
    }
  });

  return suggestions;
}

/* ---------------- HEALTH SCORE ---------------- */

export function calculateModpackHealth(modpack) {
  let score = 100;

  const conflicts = detectConflicts(modpack);
  const missing = detectMissingDependencies(modpack);

  score -= conflicts.length * 20;
  score -= missing.length * 15;

  if (!modpack?.mods || modpack.mods.length === 0) {
    score -= 30;
  }

  if (!modpack?.mcVersion) {
    score -= 10;
  }

  if (!modpack?.loader) {
    score -= 10;
  }

  return Math.max(0, score);
}

/* ---------------- FULL REPORT ---------------- */

export function getModpackReport(modpack) {
  return {
    health: calculateModpackHealth(modpack),
    conflicts: detectConflicts(modpack),
    missing: detectMissingDependencies(modpack),
    suggestions: suggestMods(modpack),
  };
}
