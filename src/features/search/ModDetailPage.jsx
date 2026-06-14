import { useEffect, useState } from "react";
import { getModDetails } from "./api/modDetails";

export default function ModDetailPage({ modId, onBack }) {
  const [mod, setMod] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getModDetails(modId);
      setMod(data);
    }
    load();
  }, [modId]);

  if (!mod) return <p>Loading...</p>;

  return (
    <div className="page">

      <button onClick={onBack}>← Back</button>

      <h2>{mod.title}</h2>

      <p>{mod.description}</p>

      <p>
        ⬇ Downloads: {mod.downloads}
      </p>

      <p>
        🌐 Source: {mod.source}
      </p>

    </div>
  );
}
