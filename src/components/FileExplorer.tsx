import React, { useEffect, useState } from "react";
import { listFiles } from "../lib/api";

type FileItem = { name: string };

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await listFiles();
        if (mounted) setFiles(result);
      } catch (e) {
        if (mounted) setError("Failed to load files");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-800 rounded p-4 border border-green-700 min-h-[200px]">
      <h2 className="text-xl font-semibold mb-2 text-green-400">File Explorer</h2>
      {loading && <div className="text-green-400">Loading...</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && (
        <ul>
          {files.length === 0 ? (
            <li className="text-green-300">No files found.</li>
          ) : (
            files.map((file, idx) => (
              <li key={idx} className="text-green-200">{file.name}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
