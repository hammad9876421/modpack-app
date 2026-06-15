export function validateModpack(modpack, loader, version) {
  const issues = [];

  modpack.forEach((mod) => {
    if (!mod.id) issues.push("Missing mod ID");
    if (!mod.title) issues.push("Missing mod title");

    if (mod.gameVersion && mod.gameVersion !== version) {
      issues.push(`${mod.title} version mismatch`);
    }

    if (mod.loader && mod.loader !== loader) {
      issues.push(`${mod.title} loader mismatch`);
    }
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}
