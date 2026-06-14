import { useEffect, useState } from "react";
import {
  addDownload,
  onDownloadUpdate,
  retryFailed,
} from "./downloadEngine";

export default function useDownloads() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const unsub = onDownloadUpdate(setDownloads);
    return () => unsub();
  }, []);

  return {
    downloads,
    addDownload,
    retryFailed,
  };
}
