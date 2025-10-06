import React, { useState } from "react";

type Disk = { name: string };

export default function DiskManager() {
  const [disks, setDisks] = useState<Disk[]>([]);
  const [newDisk, setNewDisk] = useState("");

  const handleAddDisk = () => {
    if (newDisk) {
      setDisks([...disks, { name: newDisk }]);
      setNewDisk("");
    }
  };

  return (
    <div className="bg-gray-800 rounded p-4 border border-green-700 mt-4">
      <h2 className="text-xl font-semibold mb-2 text-green-400">Disk Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newDisk}
          onChange={e => setNewDisk(e.target.value)}
          placeholder="New disk name"
          className="bg-gray-900 text-green-300 px-2 py-1 rounded mr-2"
        />
        <button
          onClick={handleAddDisk}
          className="bg-green-700 text-green-100 px-3 py-1 rounded"
        >
          Add Disk
        </button>
      </div>
      <ul>
        {disks.length === 0 ? (
          <li className="text-green-300">No disks found.</li>
        ) : (
          disks.map((disk, idx) => (
            <li key={idx} className="text-green-200">{disk.name}</li>
          ))
        )}
      </ul>
    </div>
  );
}
