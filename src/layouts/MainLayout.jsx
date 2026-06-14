import Header from "../features/shared/Header";

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      {children}
    </div>
  );
}
