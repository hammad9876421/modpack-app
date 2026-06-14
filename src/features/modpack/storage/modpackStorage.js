const KEY = "modpacks_v1";

/**
 * Load all modpacks
 */
export function loadModpacks() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save all modpacks
 */
export function saveModpacks(modpacks) {
  localStorage.setItem(KEY, JSON.stringify(modpacks));
}

/**
 * Create new modpack
 */
export function createModpack(name) {
  const modpacks = loadModpacks();

  const newPack = {
    id: Date.now().toString(),
    name: name || "New Modpack",
    mods: [],
    createdAt: Date.now(),
  };

  modpacks.push(newPack);
  saveModpacks(modpacks);

  return newPack;
}

/**
 * Update modpack
 */
export function updateModpack(updated) {
  const modpacks = loadModpacks();

  const index = modpacks.findIndex((p) => p.id === updated.id);

  if (index !== -1) {
    modpacks[index] = updated;
    saveModpacks(modpacks);
  }
}

/**
 * Delete modpack
 */
export function deleteModpack(id) {
  const modpacks = loadModpacks().filter((p) => p.id !== id);
  saveModpacks(modpacks);
}
