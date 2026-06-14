import { useEffect, useState } from "react";

import {
  loadModpacks,
  createModpack,
  updateModpack,
  deleteModpack,
  updateModpackMeta,
} from "./storage/modpackStorage";

import { getModpackReport } from "../intelligence/modpackIntelligence";

export default function useModpackManager() {
  const [modpacks, setModpacks] = useState([]);
  const [activeId, setActiveId] = useState(null);

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    const data = loadModpacks();
    setModpacks(data);

    if (data.length > 0) {
      setActiveId(data[0].id);
    }
  }, []);

  const activePack =
    modpacks.find((p) => p.id === activeId) || null;

  /* ---------------- CREATE ---------------- */
  const addPack = (name) => {
    const newPack = createModpack(name);

    const updated = [...modpacks, newPack];
    setModpacks(updated);

    setActiveId(newPack.id);
  };

  /* ---------------- DELETE ---------------- */
  const removePack = (id) => {
    deleteModpacks(id);

    const updated = modpacks.filter((p) => p.id !== id);
    setModpacks(updated);

    if (activeId === id && updated.length > 0) {
      setActiveId(updated[0].id);
    }
  };

  /* ---------------- SWITCH ---------------- */
  const switchPack = (id) => {
    setActiveId(id);
  };

  /* ---------------- ADD MOD ---------------- */
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

  /* ---------------- VERSION CONTROL ---------------- */
  const setVersion = (version) => {
    if (!activePack) return;

    const updated = {
      ...activePack,
      mcVersion: version,
    };

    updateModpackMeta(activePack.id, {
      mcVersion: version,
    });

    setModpacks((prev) =>
      prev.map((p) =>
        p.id === activePack.id ? updated : p
      )
    );
  };

  /* ---------------- LOADER CONTROL ---------------- */
  const setLoader = (loader) => {
    if (!activePack) return;

    const updated = {
      ...activePack,
      loader,
    };

    updateModpackMeta(activePack.id, {
      loader,
    });

    setModpacks((prev) =>
      prev.map((p) =>
        p.id === activePack.id ? updated : p
      )
    );
  };

  /* ---------------- INTELLIGENCE LAYER ---------------- */
  const getActiveReport = () => {
    if (!activePack) return null;

    return getModpackReport(activePack);
  };

  /* ---------------- RETURN API ---------------- */
  return {
    modpacks,
    activePack,
    activeId,

    addPack,
    removePack,
    switchPack,
    addModToActivePack,

    setVersion,
    setLoader,

    // 🧠 INTELLIGENCE OUTPUT
    getActiveReport,
  };
}
