let queue = [];
let isProcessing = false;
let listeners = [];

/**
 * Subscribe to download updates
 */
export function onDownloadUpdate(cb) {
  listeners.push(cb);

  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

/**
 * Notify UI
 */
function notify(state) {
  listeners.forEach((cb) => cb([...state]));
}

/**
 * Add download to queue
 */
export function addDownload(item) {
  queue.push({
    id: item.id,
    name: item.name,
    url: item.url,
    progress: 0,
    status: "queued", // queued | downloading | done | failed
    retries: 0,
  });

  processQueue();
  notify(queue);
}

/**
 * Simulated download process
 */
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

      notify(queue);
    }, 300);
  });
}

/**
 * Process queue sequentially
 */
async function processQueue() {
  if (isProcessing) return;

  isProcessing = true;

  for (const item of queue) {
    if (item.status === "done") continue;

    try {
      await fakeDownload(item);
    } catch (err) {
      item.status = "failed";
    }

    notify(queue);
  }

  isProcessing = false;
}

/**
 * Retry failed downloads
 */
export function retryFailed() {
  queue.forEach((item) => {
    if (item.status === "failed") {
      item.status = "queued";
      item.progress = 0;
    }
  });

  processQueue();
}
