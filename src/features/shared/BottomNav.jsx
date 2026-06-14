import Button from "./Button";

export default function BottomNav({ page, setPage }) {
  return (
    <nav className="bottom-nav">
      <Button active={page === "home"} onClick={() => setPage("home")}>
        Home
      </Button>

      <Button active={page === "search"} onClick={() => setPage("search")}>
        Search
      </Button>

      <Button active={page === "modpack"} onClick={() => setPage("modpack")}>
        Modpack
      </Button>

      <Button active={page === "settings"} onClick={() => setPage("settings")}>
        Settings
      </Button>
    </nav>
  );
}
