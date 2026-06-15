export function createDownloadStatus() {
  return {
    state: "queued",
    progress: 0,
    source: "Modrinth CDN",
    retries: 0,
    error: null,
  };
}

export function markDownloading(status) {
  return {
    ...status,
    state: "downloading",
  };
}

export function markCompleted(status) {
  return {
    ...status,
    state: "completed",
    progress: 100,
  };
}

export function markFailed(status, error) {
  return {
    ...status,
    state: "failed",
    error,
  };
}
