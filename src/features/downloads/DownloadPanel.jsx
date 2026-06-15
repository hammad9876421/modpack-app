import useDownloads from "./useDownloads";

export default function DownloadPanel() {
  const { downloads, retryFailed } = useDownloads();

  return (
    <div style={{ padding: "10px" }}>
      <h3>⬇ Downloads</h3>

      <button onClick={retryFailed}>
        Retry Failed
      </button>

      {downloads.map((d) => (
        <div key={d.id} style={{ marginTop: "10px" }}>
          <div>{d.name}</div>

          <div
            style={{
              height: "6px",
              background: "#ddd",
            }}
          >
            <div
              style={{
                width: `${d.progress}%`,
                height: "6px",
                background: "green",
              }}
            />
          </div>

          <small>{d.status}</small>
        </div>
      ))}
    </div>
  );
}
