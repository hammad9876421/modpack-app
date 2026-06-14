import { useEffect, useState } from "react";
import ModCard from "./components/ModCard";
import useToast from "../ui/useToast";
import Toast from "../ui/Toast";
import { searchMods } from "../../api/modrinthEngine";

export default function SearchPage() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { toast, showToast } = useToast();

  const fetchMods = async (reset = false) => {
    setLoading(true);

    const result = await searchMods(query, page);

    setMods((prev) =>
      reset ? result : [...prev, ...result]
    );

    setLoading(false);
  };

  // initial + page load
  useEffect(() => {
    fetchMods(page === 1);
  }, [page]);

  // infinite scroll
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

  // search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);
    setMods([]);
  };

  return (
    <div className="mod-grid">

      <h2>🔍 Explore Mods</h2>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search mods..."
        value={query}
        onChange={handleSearch}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      {/* MOD LIST */}
      {mods.map((mod) => (
        <ModCard
          key={mod.id}
          mod={mod}
          showToast={showToast}
        />
      ))}

      {loading && <p>Loading...</p>}

      {/* TOAST */}
      <Toast message={toast} />

    </div>
  );
}
