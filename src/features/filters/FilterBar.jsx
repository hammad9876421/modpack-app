export default function FilterBar({ filters, setFilter }) {
  return (
    <div style={{ padding: 16 }}>
      <h3>Filters</h3>

      <select
        value={filters.version}
        onChange={(e) =>
          setFilter("version", e.target.value)
        }
      >
        <option>1.21.1</option>
        <option>1.20.1</option>
      </select>

      <select
        value={filters.loader}
        onChange={(e) =>
          setFilter("loader", e.target.value)
        }
      >
        <option>NeoForge</option>
        <option>Fabric</option>
        <option>Forge</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          setFilter("category", e.target.value)
        }
      >
        <option>all</option>
        <option>performance</option>
        <option>tech</option>
      </select>
    </div>
  );
}
