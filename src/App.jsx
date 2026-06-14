import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "search":
        return (
          <div className="page">
            <h2>Search Mods</h2>
            <p>Coming in Phase 3</p>
          </div>
        );

      case "modpack":
        return (
          <div className="page">
            <h2>Modpack Builder</h2>
            <p>Coming in Phase 5</p>
          </div>
        );

      case "settings":
        return (
          <div className="page">
            <h2>Settings</h2>
            <p>Coming in Phase 6</p>
          </div>
        );

      default:
        return (
          <div className="page">
            <h1>ModPack App</h1>

            <p>
              Minecraft Mod Browser &
              Modpack Builder
            </p>

            <div className="card">

              <p>
                ✅ Phase 1 is currently being built.
              </p>

              <p>
                Future features:
              </p>

              <ul>
                <li>Infinite scrolling</li>
                <li>Modrinth search</li>
                <li>CurseForge search</li>
                <li>One-click download</li>
                <li>One-click add to modpack</li>
                <li>ZIP export</li>
              </ul>

            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">

      <main>

        {renderPage()}

      </main>

      <nav className="bottom-nav">

        <button
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          onClick={() => setPage("search")}
        >
          Search
        </button>

        <button
          onClick={() => setPage("modpack")}
        >
          Modpack
        </button>

        <button
          onClick={() => setPage("settings")}
        >
          Settings
        </button>

      </nav>

    </div>
  );
}
