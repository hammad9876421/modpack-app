export function exportModpack(modpack) {
  const mcVersion = localStorage.getItem("mcVersion") || "unknown";
  const loader = localStorage.getItem("loader") || "fabric";

  const data = {
    name: "My Modpack",
    createdAt: new Date().toISOString(),
    minecraft: mcVersion,
    loader: loader,
    mods: modpack,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `modpack-${mcVersion}-${loader}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
