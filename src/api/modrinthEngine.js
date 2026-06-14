const BASE_URL = "https://api.modrinth.com/v2";

const cache = new Map();

/* ---------------- SAFE FETCH ---------------- */
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Modrinth API Error:", err);
    return null;
  }
}

/* ---------------- NORMALIZE MOD ---------------- */
function normalizeMod(mod) {
  return {
    id: mod.id,
    slug: mod.slug,
    title: mod.title,
    description: mod.description || "",
    author: mod.author || "Unknown",
    icon: mod.icon_url || null,
    downloads: mod.downloads || 0,

    categories: mod.categories || [],
    projectType: mod.project_type || "mod",
    createdAt: mod.published || null,
    updatedAt: mod.updated || null,

    clientSide: mod.client_side || "unknown",
    serverSide: mod.server_side || "unknown",

    url: `https://modrinth.com/mod/${mod.slug}`,
    source: "modrinth",
  };
}

/* ---------------- SEARCH MODS ---------------- */
export async function searchMods(query = "", page = 1) {
  const key = `search:${query}:${page}`;

  if (cache.has(key)) return cache.get(key);

  const limit = 20;
  const offset = (page - 1) * limit;

  const data = await safeFetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
  );

  if (!data) return [];

  const mods = (data.hits || []).map(normalizeMod);

  cache.set(key, mods);

  return mods;
}

/* ---------------- ADVANCED SEARCH (FUTURE READY) ---------------- */
export async function searchModsAdvanced(query = "", page = 1, filters = {}) {
  const key = `adv:${query}:${page}:${JSON.stringify(filters)}`;

  if (cache.has(key)) return cache.get(key);

  const limit = 20;
  const offset = (page - 1) * limit;

  let url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;

  if (filters.sort) url += `&index=${filters.sort}`;
  if (filters.version) url += `&version=${filters.version}`;

  const data = await safeFetch(url);

  if (!data) return [];

  const mods = (data.hits || []).map(normalizeMod);

  cache.set(key, mods);

  return mods;
}

/* ---------------- GET MOD ---------------- */
export async function getModById(id) {
  const key = `mod:${id}`;

  if (cache.has(key)) return cache.get(key);

  const data = await safeFetch(`${BASE_URL}/project/${id}`);

  if (!data) return null;

  const mod = normalizeMod(data);

  cache.set(key, mod);

  return mod;
}

/* ---------------- CACHE CLEAR ---------------- */
export function clearModCache() {
  cache.clear();
}
