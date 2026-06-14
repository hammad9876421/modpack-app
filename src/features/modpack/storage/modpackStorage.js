const KEY = "modpacks_v1";

/* ---------------- LOAD ---------------- */
export function loadModpacks() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

/* ---------------- SAVE ---------------- */
export function saveModpacks(modpacks) {
  localStorage.setItem(KEY, JSON.stringify(modpacks));
}

/* ---------------- CREATE ---------------- */
export function createModpack(name) {
  const modpacks = loadModpacks();

  const newPack = {
    id: Date.now().toString(),
    name: name || "New Modpack",

    mcVersion: "1.20.1",
    loader: "forge",

    mods: [],
    createdAt: Date.now(),
  };

  modpacks.push(newPack);
  saveModpacks(modpacks);

  return newPack;
}

/* ---------------- UPDATE ---------------- */
export function updateModpack(updated) {
  const modpacks = loadModpacks();

  const index = modpacks.findIndex((p) => p.id === updated.id);

  if (index !== -1) {
    modpacks[index] = updated;
    saveModpacks(modpacks);
  }
}

/* ---------------- DELETE ---------------- */
export function deleteModpack(id) {
  const modpacks = loadModpacks().filter((p) => p.id !== id);
  saveModpacks(modpacks);
}

/* ---------------- META UPDATE ---------------- */
export function updateModpackMeta(id, data) {
  const modpacks = loadModpacks();

  const updated = modpacks.map((p) => {
    if (p.id !== id) return p;

    return {
      ...p,
      ...data,
    };
  });

  saveModpacks(updated);
}
