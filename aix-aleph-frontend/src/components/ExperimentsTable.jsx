import React from "react";
import { Button } from "./Buttons.jsx";

function sortBy(xs, key, dir) {
  const s = [...xs].sort((a,b) => {
    const va = (a?.[key] ?? "").toString().toLowerCase();
    const vb = (b?.[key] ?? "").toString().toLowerCase();
    if (va < vb) return -1;
    if (va > vb) return 1;
    return 0;
  });
  return dir === "desc" ? s.reverse() : s;
}

export default function ExperimentsTable({ data = [], onCreate }) {
  const [sortKey, setSortKey] = React.useState("name");
  const [sortDir, setSortDir] = React.useState("asc");

  const sorted = React.useMemo(() => sortBy(data, sortKey, sortDir), [data, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (key === sortKey) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  if (!data?.length) {
    return (
      <div className="glass p-8 text-center space-y-4">
        <div className="text-2xl">Keine Experimente</div>
        <p className="opacity-70">Lege dein erstes Experiment an – Feature-Flags, Splits & Metriken warten 🧪</p>
        <Button onClick={onCreate}>Experiment erstellen</Button>
      </div>
    );
  }

  return (
    <div className="glass p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/60 dark:bg-white/5 sticky top-0 backdrop-blur">
            <tr className="[&>th]:py-3 [&>th]:px-4 [&>th]:text-left">
              <th className="cursor-pointer select-none" onClick={() => toggleSort("name")}>
                Name {sortKey==="name" ? (sortDir==="asc"?"↑":"↓") : ""}
              </th>
              <th className="cursor-pointer select-none" onClick={() => toggleSort("status")}>
                Status {sortKey==="status" ? (sortDir==="asc"?"↑":"↓") : ""}
              </th>
              <th>Arms</th>
              <th>Created</th>
              <th className="text-right pr-6">Aktion</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:border-white/20 dark:[&>tr]:border-white/10">
            {sorted.map(x => (
              <tr key={x.id} className="[&>td]:py-3 [&>td]:px-4">
                <td className="font-medium">{x.name}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs ${x.status==="running" ? "bg-green-500/15 text-green-600 dark:text-green-300" :
                                       x.status==="paused"  ? "bg-amber-500/15 text-amber-600 dark:text-amber-300" :
                                                              "bg-slate-500/15 text-slate-600 dark:text-slate-300"}`}>
                    {x.status}
                  </span>
                </td>
                <td className="opacity-80">{Array.isArray(x.arms) ? x.arms.map(a=>a.name).join(", ") : "-"}</td>
                <td className="opacity-70">{x.createdAt ? new Date(x.createdAt).toLocaleString() : "-"}</td>
                <td className="text-right pr-6">
                  <Button variant="secondary" className="mr-2">Details</Button>
                  <Button variant="ghost">Start</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
