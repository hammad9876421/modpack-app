export default function ModCard({ mod }) {
  return (
    <div className="card">

      {mod.icon && (
        <img
          src={mod.icon}
          alt={mod.title}
          width="40"
          height="40"
        />
      )}

      <h3>{mod.title}</h3>

      <p>
        {mod.description
          ? mod.description.slice(0, 120)
          : "No description available"}
      </p>

      <small>
        ⬇ {mod.downloads || 0} downloads
      </small>

    </div>
  );
}
