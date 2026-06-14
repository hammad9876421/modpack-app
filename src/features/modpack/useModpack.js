import { useModpackEngine } from "./core/modpackEngine";

/**
 * SINGLE SOURCE OF TRUTH FOR MODPACK
 */
export default function useModpack() {
  const engine = useModpackEngine();

  return {
    modpack: engine.modpack,
    addMod: engine.addMod,
    removeMod: engine.removeMod,
    clearModpack: engine.clearModpack,
    validateModpack: engine.validateModpack,
  };
}
