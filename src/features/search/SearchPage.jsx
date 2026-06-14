import { useEffect, useState } from "react";
import { unifiedSearch } from "./api";
import ModCard from "./components/ModCard";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import LoaderFilter from "./components/LoaderFilter";
import useDebounce from "../../hooks/useDebounce";
import ModDetailPage from "./ModDetailPage";
import useFavorites from "../../hooks/useFavorites";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedMod, setSelectedMod] = useState(null);
  const [version, setVersion] = useState("");
  const [loader, setLoader] = useState("");

  const debouncedQuery = useDebounce(query, 500);
  const { addFavorite } = useFavorites();

  const fetchResults = async (q, p = 1, append = false) => {
    if (!q.trim()) return;

    setLoading(true);

    const data = await unifiedSearch(q, p);

    setResults((prev) =>
      append ? [...prev, ...(data || [])] : (data || [])
    );

    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchResults(debouncedQuery, 1, false);
  }, [debouncedQuery]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchResults(query, next, true);
  };

  if (selectedMod) {
    return (
      <ModDetailPage
        modId={selectedMod.id}
        onBack={() => setSelectedMod(null)}
      />
    );
  }

  return (
    <div className="page">

      <h2>Search Mods</h2>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={() => fetchResults(query)}
      />

      <FilterBar version={version} setVersion={setVersion} />
      <LoaderFilter loader={loader} setLoader={setLoader} />

      {loading && <p>Loading...</p>}

      {results.map((mod) => (
        <ModCard
          key={mod.id}
          mod={mod}
          onClick={setSelectedMod}
          onFavorite={addFavorite}
        />
      ))}

      {results.length > 0 && (
        <button onClick={loadMore}>
          Load More
        </button>
      )}

    </div>
  );
}
