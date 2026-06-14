let queue = [];
let listeners = [];
let isProcessing = false;

/* ---------------- LISTENER SYSTEM ---------------- */
export function onDownloadUpdate(cb) {
  listeners.push(cb);

  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function notify() {
  listeners.forEach((cb) => cb([...queue]));
}

/* ---------------- ADD DOWNLOAD ---------------- */
export function addDownload(item) {
  const exists = queue.find((q) => q.id === item.id);

  if (exists) {
    exists.retries += 1;
    notify();
    return;
  }

  queue.push({
    id: item.id,
    name: item.name,
    url: item.url,
    progress: 0,
    status: "queued",
    retries: 0,
  });

  processQueue();
  notify();
}

/* ---------------- FAKE DOWNLOAD ---------------- */
function fakeDownload(item) {
  return new Promise((resolve) => {
    let progress = 0;

    item.status = "downloading";

    const interval = setInterval(() => {
      progress += Math.random() * 20;

      if (progress >= 100) {
        clearInterval(interval);
        item.progress = 100;
        item.status = "done";
        resolve(item);
      } else {
        item.progress = Math.min(100, progress);
      }

      notify();
    }, 250);
  });
}

/* ---------------- PROCESS QUEUE ---------------- */
async function processQueue() {
  if (isProcessing) return;

  isProcessing = true;

  for (const item of queue) {
    if (item.status === "done") continue;

    try {
      await fakeDownload(item);
    } catch (e) {
      item.status = "failed";
    }

    notify();
  }

  isProcessing = false;
}

/* ---------------- RETRY FAILED ---------------- */
export function retryFailed() {
  queue.forEach((item) => {
    if (item.status === "failed") {
      item.status = "queued";
      item.progress = 0;
    }
  });

  processQueue();
}
