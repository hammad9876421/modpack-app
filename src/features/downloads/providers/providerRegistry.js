export const PROVIDERS = [
  {
    id: "modrinth",
    name: "Modrinth",
    enabled: true,
    priority: 1,
  },
  {
    id: "curseforge",
    name: "CurseForge",
    enabled: true,
    priority: 2,
  },
  {
    id: "github",
    name: "GitHub Releases",
    enabled: true,
    priority: 3,
  },
  {
    id: "direct",
    name: "Direct URL",
    enabled: true,
    priority: 4,
  },
];

export function getProviders() {
  return [...PROVIDERS];
}

export function getProvider(id) {
  return PROVIDERS.find((provider) => provider.id === id) || null;
}
