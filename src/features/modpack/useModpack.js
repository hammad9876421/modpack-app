import { useState } from "react";

export default function useModpack() {
  const [modpack, setModpack] = useState(() => {
    return JSON.parse(localStorage.getItem("modpack") || "[]");
  });

  const [minecraftVersion, setMinecraftVersion] = useState(
    localStorage.getItem("mcVersion") || "1.21.1"
  );

  const [loader, setLoader] = useState(
    localStorage.getItem("loader") || "fabric"
  );

  const addMod = (mod) => {
    if (modpack.find((m) => m.id === mod.id)) return;

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

  const setFullModpack = (mods) => {
    setModpack(mods);
    localStorage.setItem("modpack", JSON.stringify(mods));
  };

  const setVersion = (version) => {
    setMinecraftVersion(version);
    localStorage.setItem("mcVersion", version);
  };

  const setLoaderType = (type) => {
    setLoader(type);
    localStorage.setItem("loader", type);
  };

  return {
    modpack,
    addMod,
    removeMod,
    clearModpack,
    setFullModpack,
    minecraftVersion,
    setVersion,
    loader,
    setLoaderType,
  };
}
