import { searchModrinth } from "./modrinth";

// Future: CurseForge + mirrors will plug here
export async function searchMods(query, page = 1) {
  const data = await searchModrinth(query, page);

  return data.hits.map((mod) => ({
    id: mod.project_id,
    title: mod.title,
    description: mod.description,
    icon: mod.icon_url,
    downloads: mod.downloads,
    source: "modrinth",
  }));
}
