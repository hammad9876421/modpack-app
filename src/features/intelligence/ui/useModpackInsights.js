import { useMemo } from "react";
import { getModpackReport } from "../modpackIntelligence";

export default function useModpackInsights(modpack) {
  return useMemo(() => {
    if (!modpack) {
      return {
        health: 0,
        conflicts: [],
        missing: [],
        suggestions: [],
      };
    }

    const report = getModpackReport(modpack);

    return {
      health: report.health,
      conflicts: report.conflicts,
      missing: report.missing,
      suggestions: report.suggestions,
    };
  }, [modpack]);
}
