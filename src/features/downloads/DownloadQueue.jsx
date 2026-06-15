export default function DownloadQueue({ queue }) {
  return (
    <div style={{ padding: 16 }}>
      <h3>Downloads</h3>

      {queue.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#1f2937",
            marginBottom: 10,
            padding: 12,
            borderRadius: 10,
          }}
        >
          <p>{item.name}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
}
