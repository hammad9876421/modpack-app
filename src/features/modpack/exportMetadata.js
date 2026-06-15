export function createExportMetadata(modpack) {
  return {
    format: 2,
    name: modpack.name || "Untitled Modpack",
    version: modpack.version || "1.0.0",
    minecraftVersion: modpack.minecraftVersion,
    loader: modpack.loader,
    author: modpack.author || "",
    exportedAt: new Date().toISOString(),
    modCount: modpack.mods?.length || 0,
  };
}
