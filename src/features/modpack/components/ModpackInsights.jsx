import useModpackInsights from "../../intelligence/ui/useModpackInsights";

export default function ModpackInsights({ modpack }) {
  const data = useModpackInsights(modpack);

  return (
    <div className="p-4 rounded-lg bg-gray-900 text-white space-y-3">

      {/* HEALTH SCORE */}
      <div>
        <h3>Modpack Health</h3>
        <p className="text-xl font-bold">{data.health}/100</p>
      </div>

      {/* CONFLICTS */}
      {data.conflicts.length > 0 && (
        <div>
          <h3>Conflicts</h3>
          {data.conflicts.map((c, i) => (
            <p key={i}>⚠ {c.message}</p>
          ))}
        </div>
      )}

      {/* MISSING DEPENDENCIES */}
      {data.missing.length > 0 && (
        <div>
          <h3>Missing Dependencies</h3>
          {data.missing.map((m, i) => (
            <p key={i}>📦 {m.mod} - {m.reason}</p>
          ))}
        </div>
      )}

      {/* SUGGESTIONS */}
      {data.suggestions.length > 0 && (
        <div>
          <h3>Suggestions</h3>
          {data.suggestions.slice(0, 5).map((s, i) => (
            <p key={i}>
              💡 {s.id} ({s.type})
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
