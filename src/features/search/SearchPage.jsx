import { useState } from "react";
import useMods from "../mods/useMods";
import ModList from "../mods/components/ModList";
import ModDetails from "../mods/ModDetails";

export default function SearchPage() {
  const {
    mods,
    favorites,
    addFavorite,
    addToModpack,
  } = useMods();

  const [selectedMod, setSelectedMod] = useState(null);

  if (selectedMod) {
    return (
      <ModDetails
        mod={selectedMod}
        onBack={() => setSelectedMod(null)}
        onAdd={addToModpack}
      />
    );
  }

  return (
    <ModList
      mods={mods}
      favorites={favorites}
      onAdd={addToModpack}
      onFavorite={addFavorite}
      onOpen={setSelectedMod}
    />
  );
}
