import { useState } from "react";

export default function useFilters() {
  const [filters, setFilters] = useState({
    version: "1.21.1",
    loader: "NeoForge",
    category: "all",
  });

  const setFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return { filters, setFilter };
}
