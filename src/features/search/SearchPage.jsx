import { useEffect, useState } from "react";
import ModCard from "./components/ModCard";
import useToast from "../ui/useToast";
import Toast from "../ui/Toast";

export default function SearchPage() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { toast, showToast } = useToast();

  const fetchMods = async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.modrinth.com/v2/search?limit=20&offset=${(page - 1) * 20}`
    );

    const data = await res.json();

    setMods((prev) => [...prev, ...(data.hits || [])]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMods();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage((p) => p + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mod-grid">

      <h2>🔍 Explore Mods</h2>

      {mods.map((mod) => (
        <ModCard
          key={mod.id}
          mod={mod}
          showToast={showToast}
        />
      ))}

      {loading && <p>Loading...</p>}

      {/* GLOBAL TOAST */}
      <Toast message={toast} />

    </div>
  );
}
