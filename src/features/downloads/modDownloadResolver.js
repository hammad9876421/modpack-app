const MODRINTH_API = "https://api.modrinth.com/v2";

/* ---------------- FETCH HELPERS ---------------- */
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.error("Download resolver error:", err);
    return null;
  }
}

/* ---------------- GET MOD VERSIONS ---------------- */
export async function getModVersions(modId) {
  const data = await safeFetch(
    `${MODRINTH_API}/project/${modId}/version`
  );

  return data || [];
}

/* ---------------- FIND BEST MATCH ---------------- */
export function pickBestVersion(versions, mcVersion, loader) {
  if (!Array.isArray(versions)) return null;

  // priority:
  // 1. exact mc + loader match
  // 2. mc match only
  // 3. fallback latest

  const exact = versions.find(
    (v) =>
      v.game_versions?.includes(mcVersion) &&
      v.loaders?.includes(loader)
  );

  if (exact) return exact;

  const mcMatch = versions.find((v) =>
    v.game_versions?.includes(mcVersion)
  );

  if (mcMatch) return mcMatch;

  return versions[0] || null;
}

/* ---------------- RESOLVE DOWNLOAD URL ---------------- */
export function resolveDownloadUrl(version) {
  if (!version) return null;

  // Modrinth provides direct file URL
  return {
    primary: version.files?.[0]?.url || null,
    filename: version.files?.[0]?.filename || null,
    size: version.files?.[0]?.size || 0,

    // future-ready mirrors (placeholders)
    mirrors: {
      modrinth: version.files?.[0]?.url || null,
      fallback: null,
    },
  };
}

/* ---------------- FULL RESOLUTION PIPELINE ---------------- */
export async function resolveModDownload(modId, mcVersion, loader) {
  const versions = await getModVersions(modId);

  if (!versions || versions.length === 0) {
    return null;
  }

  const best = pickBestVersion(versions, mcVersion, loader);

  const download = resolveDownloadUrl(best);

  return {
    modId,
    mcVersion,
    loader,
    versionId: best?.id || null,
    name: best?.name || null,
    download,
  };
}
