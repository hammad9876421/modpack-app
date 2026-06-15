import { useState } from "react";

export default function useModpackStore() {
  const [modpack, setModpack] = useState(() => {
    return JSON.parse(localStorage.getItem("modpack") || "[]");
  });

  const addMod = (mod) => {
    const exists = modpack.find((m) => m.id === mod.id);
    if (exists) return;

    const updated = [...modpack, mod];
    setModpack(updated);
    localStorage.setItem("modpack", JSON.stringify(updated));
  };

  const removeMod = (id) => {
    const updated = modpack.filter((m) => m.id !== id);
    setModpack(updated);
    localStorage.setItem("modpack", JSON.stringify(updated));
  };

  const clearModpack = () => {
    setModpack([]);
    localStorage.removeItem("modpack");
  };

  const setModpackDirect = (mods) => {
    setModpack(mods);
    localStorage.setItem("modpack", JSON.stringify(mods));
  };

  return {
    modpack,
    addMod,
    removeMod,
    clearModpack,
    setModpack: setModpackDirect,
  };
}
