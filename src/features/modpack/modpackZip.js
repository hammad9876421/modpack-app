export function buildModpackZip(modpack, meta, version, loader) {
  const structure = {
    meta: {
      name: meta.name,
      author: meta.author,
      description: meta.description,
      minecraftVersion: version,
      loader: loader,
      createdAt: new Date().toISOString(),
    },

    mods: modpack.map((mod) => ({
      id: mod.id,
      name: mod.title,
      url: mod.project_url || mod.url || "",
    })),

    folderStructure: {
      "mods/": modpack.map((m) => `${m.title}.jar`),
      "config/": [],
      "pack.json": "metadata",
    },
  };

  const blob = new Blob([JSON.stringify(structure, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${meta.name || "modpack"}-structure.json`;
  a.click();

  URL.revokeObjectURL(url);
}
