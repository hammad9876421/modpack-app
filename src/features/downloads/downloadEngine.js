import { resolveModDownload } from "./modDownloadResolver";

let queue = [];
let listeners = [];
let isProcessing = false;

/* ---------------- LISTENERS ---------------- */
export function onDownloadUpdate(cb) {
  listeners.push(cb);

  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function notify() {
  listeners.forEach((cb) => cb([...queue]));
}

/* ---------------- ADD DOWNLOAD (REAL RESOLVER CONNECTED) ---------------- */
export async function addDownload(item, mcVersion, loader) {
  const exists = queue.find((q) => q.id === item.id);

  if (exists) {
    exists.retries += 1;
    notify();
    return;
  }

  // 🧠 REAL MODRINTH RESOLUTION
  const resolved = await resolveModDownload(
    item.id,
    mcVersion,
    loader
  );

  if (!resolved || !resolved.download?.primary) {
    queue.push({
      id: item.id,
      name: item.name,
      status: "failed",
      progress: 0,
      error: "No valid download found for this version/loader",
    });

    notify();
    return;
  }

  queue.push({
    id: item.id,
    name: item.name,

    url: resolved.download.primary,
    filename: resolved.download.filename,

    progress: 0,
    status: "queued",
    retries: 0,
  });

  processQueue();
  notify();
}

/* ---------------- FAKE DOWNLOAD ENGINE (SIMULATED TRANSFER) ---------------- */
function fakeDownload(item) {
  return new Promise((resolve) => {
    let progress = 0;

    item.status = "downloading";

    const interval = setInterval(() => {
      progress += Math.random() * 18;

      if (progress >= 100) {
        clearInterval(interval);

        item.progress = 100;
        item.status = "done";

        resolve(item);
      } else {
        item.progress = Math.min(100, progress);
      }

      notify();
    }, 200);
  });
}

/* ---------------- PROCESS QUEUE ---------------- */
async function processQueue() {
  if (isProcessing) return;

  isProcessing = true;

  for (const item of queue) {
    if (item.status === "done" || item.status === "failed") continue;

    try {
      await fakeDownload(item);
    } catch (e) {
      item.status = "failed";
    }

    notify();
  }

  isProcessing = false;
}

/* ---------------- RETRY FAILED DOWNLOADS ---------------- */
export function retryFailed() {
  queue.forEach((item) => {
    if (item.status === "failed") {
      item.status = "queued";
      item.progress = 0;
      item.error = null;
    }
  });

  processQueue();
  notify();
}
