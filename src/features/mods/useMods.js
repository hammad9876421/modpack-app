import { useState } from "react";

const mockMods = [
  {
    id: "create",
    name: "Create",
    category: "Technology",
    downloads: "52M",
    loader: "NeoForge",
    version: "1.21.1",
    description:
      "A powerful tech mod for building machines and automation.",
  },
  {
    id: "jei",
    name: "Just Enough Items",
    category: "Utility",
    downloads: "120M",
    loader: "All",
    version: "1.21.1",
    description:
      "Recipe viewer and item browser.",
  },
];

export default function useMods() {
  const [mods] = useState(mockMods);

  const [favorites, setFavorites] = useState([]);

  const addFavorite = (mod) => {
    setFavorites((prev) => [...prev, mod.id]);
  };

  const addToModpack = (mod) => {
    console.log("Added to modpack:", mod.name);
  };

  return {
    mods,
    favorites,
    addFavorite,
    addToModpack,
  };
}
