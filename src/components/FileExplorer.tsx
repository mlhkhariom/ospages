import React, { useState } from "react";

type FileItem = { name: string };

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);

  return (
    <div className="bg-gray-800 rounded p-4 border border-green-700 min-h-[200px]">
      <h2 className="text-xl font-semibold mb-2 text-green-400">File Explorer</h2>
      <ul>
        {files.length === 0 ? (
          <li className="text-green-300">No files loaded.</li>
        ) : (
          files.map((file, idx) => (
            <li key={idx} className="text-green-200">{file.name}</li>
          ))
        )}
      </ul>
    </div>
  );
}
