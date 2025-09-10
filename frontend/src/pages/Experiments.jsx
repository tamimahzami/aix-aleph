import React, { useMemo, useState } from "react";
import ContainerMax from "../components/common/ContainerMax.jsx";
import Modal from "../components/common/Modal.jsx";
import { useAuth } from "../components/routing/RequireAuth.jsx";

const STATUS = {
  planned:  { label: "Geplant",   cls: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30" },
  running:  { label: "Laufend",   cls: "bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] border-[var(--theme-primary)]/30" },
  paused:   { label: "Pausiert",  cls: "bg-orange-500/15 text-orange-300 border-orange-500/30" },
  done:     { label: "Abgeschlossen", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
};

const initial = [
  { id: "exp-001", title: "Flotten-Routing: RL Basis",            owner: "Core Lab",      status: "running", progress: 62 },
  { id: "exp-002", title: "Energieprognose: LSTM vs. TST",        owner: "Energy Team",   status: "planned", progress: 0  },
  { id: "exp-003", title: "Anomalie-Detektion: Autoencoder",      owner: "Ops",           status: "paused",  progress: 34 },
  { id: "exp-004", title: "Dispatch Optimierung: ILP + Heuristik", owner: "Optimization",  status: "done",    progress: 100},
];

export default function Experiments() {
  const { user } = useAuth?.() ?? { user: null }; // falls Auth noch nicht eingebunden
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all"); // all | planned | running | paused | done
  const [showNew, setShowNew] = useState(false);

  const list = useMemo(() => {
    return rows
      .filter(x => (tab === "all" ? true : x.status === tab))
      .filter(x => {
        const s = q.trim().toLowerCase();
        return !s || [x.id, x.title, x.owner, STATUS[x.status].label].join(" ").toLowerCase().includes(s);
      });
  }, [q, tab, rows]);

  return (
    <section className="page-section">
      <ContainerMax>
        <div className="panel space-y-5">
          <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold accent-text">Experimente</h1>
              <p className="muted text-sm">
                Willkommen {user?.name || "Researcher"} – hier bündeln wir aktive und geplante Studien.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Suchen (Titel, Owner, Status)…"
                className="w-64 max-w-full rounded-lg border px-3 py-2 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] border-[color:var(--color-line)]"
              />
              <button className="btn btn-primary" onClick={() => setShowNew(true)}>Neues Experiment</button>
            </div>
          </header>

          {/* Tabs */}
          <nav className="flex flex-wrap gap-2 text-sm">
            {[
              { key: "all",    label: "Alle" },
              { key: "planned",label: STATUS.planned.label },
              { key: "running",label: STATUS.running.label },
              { key: "paused", label: STATUS.paused.label },
              { key: "done",   label: STATUS.done.label },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={[
                  "px-3 py-1.5 rounded-lg border transition-colors",
                  tab === t.key
                    ? "border-[color:var(--theme-primary)] text-[color:var(--theme-primary)] bg-[color:var(--theme-primary)]/10"
                    : "border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] hover:bg-[color:var(--color-line)]/40",
                ].join(" ")}
                aria-pressed={tab === t.key}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Table */}
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-sm">
              <thead className="text-left text-[color:var(--color-ink-muted)] border-b border-[color:var(--color-line)]">
                <tr>
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Titel</th>
                  <th className="py-2 pr-4">Owner</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4 w-40">Fortschritt</th>
                  <th className="py-2 pr-2 text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {list.map(x => (
                  <tr key={x.id} className="border-b border-[color:var(--color-line)]/60">
                    <td className="py-3 pr-4 font-mono text-xs">{x.id}</td>
                    <td className="py-3 pr-4">{x.title}</td>
                    <td className="py-3 pr-4">{x.owner}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md border ${STATUS[x.status].cls}`}>
                        {STATUS[x.status].label}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="h-2 rounded bg-[color:var(--color-line)]/50 overflow-hidden">
                        <div
                          className="h-full bg-[var(--theme-primary)]"
                          style={{ width: `${x.progress}%` }}
                          aria-label={`Fortschritt ${x.progress}%`}
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={x.progress}
                        />
                      </div>
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <button className="btn btn-ghost text-xs">Öffnen</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center muted">
                      Nichts gefunden. Filter anpassen oder neues Experiment anlegen.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Experiment Modal */}
        {showNew && (
          <NewExperimentModal
            onClose={() => setShowNew(false)}
            onCreate={(payload) => {
              const id = `exp-${String(rows.length + 1).padStart(3, "0")}`;
              setRows(prev => [{ id, ...payload }, ...prev]);
              setShowNew(false);
            }}
          />
        )}
      </ContainerMax>
    </section>
  );
}

/** Kleines Formular im Modal, nur lokaler State */
function NewExperimentModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    owner: "",
    status: "planned",
    progress: 0,
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "progress" ? Number(value) : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const eObj = {};
    if (!form.title.trim()) eObj.title = "Titel ist erforderlich.";
    if (!form.owner.trim()) eObj.owner = "Owner ist erforderlich.";
    if (form.progress < 0 || form.progress > 100) eObj.progress = "0–100%";
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    onCreate({
      title: form.title.trim(),
      owner: form.owner.trim(),
      status: form.status,
      progress: Math.min(100, Math.max(0, Number(form.progress) || 0)),
    });
  };

  return (
    <Modal title="Neues Experiment" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm muted mb-1" htmlFor="title">Titel</label>
          <input
            id="title" name="title" value={form.title} onChange={onChange}
            className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] ${
              errors.title ? "border-functional-critical" : "border-[color:var(--color-line)]"
            }`}
          />
          {errors.title && <p className="text-functional-critical text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm muted mb-1" htmlFor="owner">Owner</label>
          <input
            id="owner" name="owner" value={form.owner} onChange={onChange}
            className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] ${
              errors.owner ? "border-functional-critical" : "border-[color:var(--color-line)]"
            }`}
          />
          {errors.owner && <p className="text-functional-critical text-sm mt-1">{errors.owner}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm muted mb-1" htmlFor="status">Status</label>
            <select
              id="status" name="status" value={form.status} onChange={onChange}
              className="w-full rounded-lg border px-3 py-2 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] border-[color:var(--color-line)]"
            >
              <option value="planned">Geplant</option>
              <option value="running">Laufend</option>
              <option value="paused">Pausiert</option>
              <option value="done">Abgeschlossen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm muted mb-1" htmlFor="progress">Fortschritt (%)</label>
            <input
              id="progress" name="progress" type="number" min="0" max="100"
              value={form.progress} onChange={onChange}
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] ${
                errors.progress ? "border-functional-critical" : "border-[color:var(--color-line)]"
              }`}
            />
            {errors.progress && <p className="text-functional-critical text-sm mt-1">{errors.progress}</p>}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
          <button type="submit" className="btn btn-primary">Anlegen</button>
        </div>
      </form>
    </Modal>
  );
}
