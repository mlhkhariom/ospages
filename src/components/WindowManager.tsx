import React, { useState } from "react";
import FileExplorer from "./FileExplorer";
import Terminal from "./Terminal";
import Settings from "./Settings";

const apps = [
  { id: "explorer", name: "File Explorer" },
  { id: "terminal", name: "Terminal" },
  { id: "settings", name: "Settings" },
];

type AppType = { id: string; name: string };
type WindowProps = { app: AppType; onClose: () => void };

function Window({ app, onClose }: WindowProps) {
  return (
    <div className="absolute top-20 left-20 w-96 h-64 bg-gray-900 border-2 border-green-600 rounded-lg shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between bg-green-900 px-3 py-2 rounded-t-lg">
        <span className="font-bold text-green-300">{app.name}</span>
        <button onClick={onClose} className="text-green-400 hover:text-green-200">✕</button>
      </div>
      <div className="flex-1 p-4 text-green-200 overflow-auto">
        {app.id === "explorer" && <FileExplorer />}
        {app.id === "terminal" && <Terminal />}
        {app.id === "settings" && <Settings />}
      </div>
    </div>
  );
}

export default function WindowManager() {
  const [openWindows, setOpenWindows] = useState<AppType[]>([]);

  const openApp = (appId: string) => {
    if (!openWindows.find(w => w.id === appId)) {
      const appToOpen = apps.find(a => a.id === appId);
      if (appToOpen) {
        setOpenWindows([...openWindows, appToOpen]);
      }
    }
  };

  const closeApp = (appId: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== appId));
  };

  return (
    <div className="relative min-h-screen bg-gray-950 font-mono">
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-gray-900 border-t border-green-700 flex items-center px-4 z-40">
        <button className="bg-green-800 text-green-200 px-4 py-2 rounded shadow mr-2 font-bold" onClick={() => openApp("explorer")}>File Explorer</button>
        <button className="bg-green-800 text-green-200 px-4 py-2 rounded shadow mr-2 font-bold" onClick={() => openApp("terminal")}>Terminal</button>
        <button className="bg-green-800 text-green-200 px-4 py-2 rounded shadow font-bold" onClick={() => openApp("settings")}>Settings</button>
        <span className="ml-auto text-green-600 text-xs">Cyber OS &copy; 2025</span>
      </div>
      {/* Windows */}
      {openWindows.map(app => (
        <Window key={app.id} app={app} onClose={() => closeApp(app.id)} />
      ))}
      {/* Background cyber effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-green-900 via-gray-950 to-green-800 opacity-30 blur-lg"></div>
      </div>
    </div>
  );
}
