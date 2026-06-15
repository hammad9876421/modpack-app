import { useEffect, useState } from "react";

import useMods from "../mods/useMods";

import ModList from "../mods/components/ModList";
import ModDetails from "../mods/ModDetails";

import ModCardSkeleton from "../ui/skeletons/ModCardSkeleton";
import BottomSheet from "../ui/BottomSheet";
import ModQuickActions from "../mods/ModQuickActions";

export default function SearchPage() {
  const {
    mods,
    favorites,
    addFavorite,
    addToModpack,
  } = useMods();

  // Loading state
  const [loading, setLoading] = useState(true);

  // Full details page
  const [selectedMod, setSelectedMod] = useState(null);

  // Bottom sheet
  const [sheetMod, setSheetMod] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Full details page
  if (selectedMod) {
    return (
      <ModDetails
        mod={selectedMod}
        onBack={() => setSelectedMod(null)}
        onAdd={addToModpack}
      />
    );
  }

  // Skeleton loading
  if (loading) {
    return (
      <div style={{ padding: 16 }}>
        <ModCardSkeleton />
        <ModCardSkeleton />
        <ModCardSkeleton />
      </div>
    );
  }

  return (
    <>
      <ModList
        mods={mods}
        favorites={favorites}
        onAdd={addToModpack}
        onFavorite={addFavorite}

        // Open bottom sheet when card is clicked
        onOpen={(mod) => setSheetMod(mod)}
      />

      <BottomSheet
        open={!!sheetMod}
        onClose={() => setSheetMod(null)}
      >
        <ModQuickActions
          mod={sheetMod}
          onAdd={addToModpack}
          onFavorite={addFavorite}
        />
      </BottomSheet>
    </>
  );
}
