const BASE_URL = "https://api.modrinth.com/v2";

/**
 * MEMORY CACHE (temporary in-app cache)
 */
const cache = new Map();

/**
 * Safe fetch wrapper
 */
async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Modrinth API Error:", err);
    return null;
  }
}

/**
 * STANDARDIZE MOD DATA
 * (VERY IMPORTANT for UI consistency)
 */
function normalizeMod(mod) {
  return {
    id: mod.id,
    slug: mod.slug,
    title: mod.title,
    description: mod.description || "",
    author: mod.author || "Unknown",
    icon: mod.icon_url || null,
    downloads: mod.downloads || 0,

    // clean URL for app usage
    url: `https://modrinth.com/mod/${mod.slug}`,

    source: "modrinth",
  };
}

/**
 * SEARCH MODS (with cache)
 */
export async function searchMods(query = "", page = 1) {
  const key = `search:${query}:${page}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

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

/**
 * GET SINGLE MOD DETAILS
 */
export async function getModById(id) {
  const key = `mod:${id}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  const data = await safeFetch(`${BASE_URL}/project/${id}`);

  if (!data) return null;

  const mod = normalizeMod(data);

  cache.set(key, mod);

  return mod;
}

/**
 * CLEAR CACHE (future use)
 */
export function clearModCache() {
  cache.clear();
}
