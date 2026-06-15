export function validateImportedModpack(data) {
  const errors = [];

  if (!data) {
    errors.push("Missing modpack data");
  }

  if (!data?.name) {
    errors.push("Missing modpack name");
  }

  if (!data?.minecraftVersion) {
    errors.push("Missing Minecraft version");
  }

  if (!data?.loader) {
    errors.push("Missing loader");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
