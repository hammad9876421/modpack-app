import { useState } from "react";

export default function useDownloadQueue() {
  const [queue, setQueue] = useState([]);

  const addDownload = (mod) => {
    setQueue((prev) => [
      ...prev,
      { ...mod, status: "queued" },
    ]);
  };

  const startDownload = (id) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "downloading" }
          : item
      )
    );
  };

  const completeDownload = (id) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "done" }
          : item
      )
    );
  };

  return {
    queue,
    addDownload,
    startDownload,
    completeDownload,
  };
}
