import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import BottomNav from "./features/shared/BottomNav";
import PageTransition from "./features/ui/PageTransition";
import { ThemeProvider } from "./features/theme/ThemeContext";

import HomePage from "./features/home/HomePage";
import SearchPage from "./features/search/SearchPage";
import ModpackPage from "./features/modpack/ModpackPage";
import FavoritesPage from "./features/home/FavoritesPage";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "home") return <HomePage />;
    if (page === "search") return <SearchPage />;
    if (page === "modpack") return <ModpackPage />;
    if (page === "favorites") return <FavoritesPage />;
    if (page === "settings") return <h2>Settings (Coming)</h2>;

    return <HomePage />;
  };

  return (
    <ThemeProvider>
  <MainLayout>
    <div className="page">
      <PageTransition>
        {renderPage()}
      </PageTransition>
    </div>

    <BottomNav
      page={page}
      setPage={setPage}
    />
  </MainLayout>
</ThemeProvider>
  );
}
