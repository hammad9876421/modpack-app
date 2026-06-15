import { useState } from "react";

/**
 * MODPACK BRAIN SYSTEM
 * Handles all mod logic (NOT UI)
 */

export function useModpackEngine() {
  const [modpack, setModpack] = useState([]);

  /**
   * ADD MOD (with duplicate protection)
   */
  const addMod = (mod) => {
    const exists = modpack.find((m) => m.id === mod.id);

    if (exists) {
      return {
        success: false,
        message: "Mod already exists in modpack",
      };
    }

    const enrichedMod = {
      ...mod,

      // 🏷️ simple intelligence tags
      tags: generateTags(mod),
      addedAt: Date.now(),
    };

    setModpack((prev) => [...prev, enrichedMod]);

    return {
      success: true,
      message: "Mod added successfully",
    };
  };

  /**
   * REMOVE MOD
   */
  const removeMod = (id) => {
    setModpack((prev) => prev.filter((m) => m.id !== id));
  };

  /**
   * CLEAR MODPACK
   */
  const clearModpack = () => {
    setModpack([]);
  };

  /**
   * BASIC VALIDATION ENGINE
   */
  const validateModpack = () => {
    const issues = [];

    if (modpack.length === 0) {
      issues.push("Modpack is empty");
    }

    if (modpack.length > 100) {
      issues.push("Modpack too large (100+ mods)");
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  };

  return {
    modpack,
    addMod,
    removeMod,
    clearModpack,
    validateModpack,
  };
}

/**
 * SIMPLE TAG GENERATOR (intelligence layer v1)
 */
function generateTags(mod) {
  const tags = [];

  const title = (mod.title || "").toLowerCase();

  if (title.includes("forge")) tags.push("forge");
  if (title.includes("fabric")) tags.push("fabric");
  if (title.includes("sodium")) tags.push("performance");
  if (title.includes("optifine")) tags.push("graphics");
  if (title.includes("shader")) tags.push("visual");

  if (mod.downloads > 1000000) {
    tags.push("popular");
  }

  return tags;
}
