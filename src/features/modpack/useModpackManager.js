import { useEffect, useState } from "react";
import {
  loadModpacks,
  createModpack,
  updateModpack,
  deleteModpack,
} from "./storage/modpackStorage";

export default function useModpackManager() {
  const [modpacks, setModpacks] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const data = loadModpacks();
    setModpacks(data);

    if (data.length > 0) {
      setActiveId(data[0].id);
    }
  }, []);

  const activePack =
    modpacks.find((p) => p.id === activeId) || null;

  /* CREATE */
  const addPack = (name) => {
    const newPack = createModpack(name);

    const updated = [...modpacks, newPack];
    setModpacks(updated);

    setActiveId(newPack.id);
  };

  /* DELETE */
  const removePack = (id) => {
    deleteModpack(id);

    const updated = modpacks.filter((p) => p.id !== id);
    setModpacks(updated);

    if (activeId === id && updated.length > 0) {
      setActiveId(updated[0].id);
    }
  };

  /* SWITCH */
  const switchPack = (id) => {
    setActiveId(id);
  };

  /* ADD MOD */
  const addModToActivePack = (mod) => {
    if (!activePack || !mod) return;

    const exists = activePack.mods.find((m) => m.id === mod.id);
    if (exists) return;

    const updated = {
      ...activePack,
      mods: [...activePack.mods, mod],
    };

    updateModpack(updated);

    const newList = modpacks.map((p) =>
      p.id === updated.id ? updated : p
    );

    setModpacks(newList);
  };

  return {
    modpacks,
    activePack,
    activeId,
    addPack,
    removePack,
    switchPack,
    addModToActivePack,
  };
}
