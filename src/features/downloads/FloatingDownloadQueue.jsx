export default function FloatingDownloadQueue({
  queue,
}) {
  if (!queue.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        left: 16,
        right: 16,
        background: "#1f2937",
        borderRadius: 16,
        padding: 14,
        zIndex: 200,
      }}
    >
      <strong>
        Downloads ({queue.length})
      </strong>

      {queue.map((item) => (
        <div key={item.id}>
          {item.name} — {item.status}
        </div>
      ))}
    </div>
  );
}
