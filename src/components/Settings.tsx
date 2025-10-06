import React, { useState } from "react";

export default function Settings() {
  const [accent, setAccent] = useState("green");
  const [theme, setTheme] = useState<"dark" | "darker">("dark");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-green-400 font-semibold mb-2">Appearance</h3>
        <div className="flex items-center gap-4">
          <label className="text-green-300">Accent</label>
          <select
            value={accent}
            onChange={e => setAccent(e.target.value)}
            className="bg-gray-900 text-green-200 px-2 py-1 rounded border border-green-700"
          >
            <option value="green">Green</option>
            <option value="cyan">Cyan</option>
            <option value="magenta">Magenta</option>
          </select>
          <label className="text-green-300 ml-6">Theme</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value as any)}
            className="bg-gray-900 text-green-200 px-2 py-1 rounded border border-green-700"
          >
            <option value="dark">Dark</option>
            <option value="darker">Darker</option>
          </select>
        </div>
      </div>

      <div className="text-green-300 text-sm">
        Accent: {accent} · Theme: {theme}
      </div>
    </div>
  );
}


