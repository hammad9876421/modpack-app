import useFavorites from "../../hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="page">
      <h2>Favorites</h2>

      {favorites.length === 0 && <p>No favorites yet</p>}

      {favorites.map((mod) => (
        <div key={mod.id} className="card">
          <h3>{mod.title}</h3>

          <button onClick={() => removeFavorite(mod.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
