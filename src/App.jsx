import { useState } from "react";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "search":
        return <h2>Search (Phase 3)</h2>;
      case "modpack":
        return <h2>Modpack (Phase 5)</h2>;
      case "settings":
        return <h2>Settings (Phase 6)</h2>;
      default:
        return <h2>Home</h2>;
    }
  };

  return (
    <MainLayout>
      {renderPage()}

      <nav className="bottom-nav">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("search")}>Search</button>
        <button onClick={() => setPage("modpack")}>Modpack</button>
        <button onClick={() => setPage("settings")}>Settings</button>
      </nav>
    </MainLayout>
  );
}
