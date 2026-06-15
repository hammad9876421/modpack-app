import ModCard from "./ModCard";

export default function ModList({
  mods,
  favorites,
  onAdd,
  onFavorite,
  onOpen,
}) {
  return (
    <div style={{ padding: 16 }}>
      {mods.map((mod) => (
        <ModCard
          key={mod.id}
          mod={mod}
          onAdd={onAdd}
          onFavorite={onFavorite}
          isFavorite={favorites.includes(mod.id)}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
