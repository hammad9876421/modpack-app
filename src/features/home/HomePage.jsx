import HomeHeader from "./components/HomeHeader";
import SearchBar from "./components/SearchBar";
import CategoryChips from "./components/CategoryChips";
import ContinueBuilding from "./components/ContinueBuilding";
import TrendingSection from "./components/TrendingSection";
import RecentSearches from "./components/RecentSearches";

export default function HomePage() {
  return (
    <div
      style={{
        background: "#111827",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <HomeHeader />

      <SearchBar />

      <CategoryChips />

      <ContinueBuilding />

      <TrendingSection />

      <RecentSearches />
    </div>
  );
}
