import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import BottomNav from "./features/shared/BottomNav";
import SearchPage from "./features/search/SearchPage";
import ModpackPage from "./features/modpack/ModpackPage";
import FavoritesPage from "./features/home/FavoritesPage";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "search") return <SearchPage />;
    if (page === "modpack") return <h2>Modpack (Coming)</h2>;
    if (page === "settings") return <h2>Settings (Coming)</h2>;
    if (page === "modpack") return <ModpackPage />;
if (page === "favorites") return <FavoritesPage />;
    return <h2>Home</h2>;
  };

  return (
    <MainLayout>
      <div className="page">{renderPage()}</div>
      <BottomNav page={page} setPage={setPage} />
    </MainLayout>
  );
}
