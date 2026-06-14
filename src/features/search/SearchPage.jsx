import { useState } from "react";
import { unifiedSearch } from "./api";
import ModCard from "./components/ModCard";
import SearchBar from "./components/SearchBar";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setPage(1);

    const data = await unifiedSearch(query, 1);

    setResults(data || []);
    setLoading(false);
  };

  const loadMore = async () => {
    const nextPage = page + 1;

    const data = await unifiedSearch(query, nextPage);

    setResults((prev) => [...prev, ...(data || [])]);
    setPage(nextPage);
  };

  return (
    <div className="page">
      <h2>Search Mods</h2>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      {loading && <p>Loading...</p>}

      {!loading && query && results.length === 0 && (
        <p>No results found</p>
      )}

      {!loading && results.map((mod) => (
        <ModCard key={mod.id} mod={mod} />
      ))}

      {results.length > 0 && (
        <button onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
