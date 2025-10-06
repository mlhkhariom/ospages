import React, { useState } from "react";

export default function Terminal() {
  const [lines, setLines] = useState<string[]>(["Cyber OS Terminal — type 'help'"]);
  const [input, setInput] = useState("");

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    if (trimmed === "help") {
      setLines(prev => [...prev, "> help", "commands: help, clear, echo <text>"]);
    } else if (trimmed === "clear") {
      setLines(["Cyber OS Terminal — type 'help'"]);
    } else if (trimmed.startsWith("echo ")) {
      setLines(prev => [...prev, "> " + trimmed, trimmed.slice(5)]);
    } else {
      setLines(prev => [...prev, "> " + trimmed, `unknown command: ${trimmed}`]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-black/70 border border-green-800 rounded p-2 overflow-auto">
        {lines.map((line, i) => (
          <div key={i} className="text-green-300">{line}</div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-2 flex">
        <span className="text-green-500 mr-2">$</span>
        <input
          className="flex-1 bg-gray-900 text-green-200 px-2 py-1 rounded outline-none border border-green-700"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="type a command..."
        />
      </form>
    </div>
  );
}


