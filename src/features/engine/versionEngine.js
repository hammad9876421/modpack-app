export const LOADERS = ["forge", "fabric", "neoforge"];

export const MC_VERSIONS = [
  "1.18.2",
  "1.19.2",
  "1.20.1",
  "1.20.4",
  "1.21.1",
];

export function normalizeCompatibility(mod) {
  return {
    ...mod,
    mcVersions: mod.game_versions || [],
    loaders: mod.loaders || [],
  };
}

export function isCompatible(mod, version, loader) {
  if (!mod) return false;

  const versionMatch =
    !mod.mcVersions?.length || mod.mcVersions.includes(version);

  const loaderMatch =
    !mod.loaders?.length || mod.loaders.includes(loader);

  return versionMatch && loaderMatch;
}

export function filterCompatibleMods(mods, version, loader) {
  if (!Array.isArray(mods)) return [];

  return mods.filter((m) =>
    isCompatible(m, version, loader)
  );
}
