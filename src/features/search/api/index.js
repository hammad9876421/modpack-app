import { searchMods } from "./searchService";

export async function unifiedSearch(query, page = 1) {
  try {
    const data = await searchMods(query, page);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.log("API error:", e);
    return [];
  }
}
