import { searchModrinth } from "./modrinth";
import { getCache, setCache } from "../../../utils/cache";

export async function searchMods(query, page = 1) {
  const key = `${query}-${page}`;

  const cached = getCache(key);
  if (cached) return cached;

  const data = await searchModrinth(query, page);

  const result = data.hits.map((mod) => ({
    id: mod.project_id,
    title: mod.title,
    description: mod.description,
    icon: mod.icon_url,
    downloads: mod.downloads,
    source: "modrinth",
  }));

  setCache(key, result);

  return result;
}
