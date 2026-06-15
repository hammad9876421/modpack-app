const MIRRORS = [
  {
    id: "modrinth",
    name: "Modrinth CDN",
    enabled: true,
    priority: 1,
  },
  {
    id: "mirror1",
    name: "Mirror 1",
    enabled: true,
    priority: 2,
  },
  {
    id: "mirror2",
    name: "Mirror 2",
    enabled: true,
    priority: 3,
  },
];

export function getMirrors() {
  return [...MIRRORS];
}

export function getPrimaryMirror() {
  return MIRRORS.find((m) => m.priority === 1);
}

export function getNextMirror(currentId) {
  const current = MIRRORS.findIndex(
    (m) => m.id === currentId
  );

  if (current === -1) {
    return getPrimaryMirror();
  }

  return MIRRORS[current + 1] || null;
}

export function isMirrorAvailable(id) {
  return MIRRORS.some(
    (m) => m.id === id && m.enabled
  );
}
