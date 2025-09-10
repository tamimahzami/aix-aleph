const BASE = '/api';

async function j(method, url, data) {
  const init = { method, headers: { 'Content-Type': 'application/json' } };
  if (data !== undefined) init.body = JSON.stringify(data);
  const res = await fetch(url, init);
  if (!res.ok) {
    const txt = await res.text().catch(()=>'');
    throw new Error(`${method} ${url} → ${res.status} ${res.statusText} ${txt || ''}`.trim());
  }
  return res.headers.get('content-type')?.includes('application/json')
    ? res.json()
    : res.text();
}

export async function health() {
  return j('GET', `${BASE}/health`);
}

export async function listExperiments() {
  return j('GET', `${BASE}/experiments`);
}

export async function createExperimentIfNotExistsByName(name='Smoke Demo') {
  const all = await listExperiments();
  const exists = all.find(e => e.name === name);
  if (exists) return exists;
  return j('POST', `${BASE}/experiments`, {
    name,
    description: 'script',
    type: 'AB',
    strategy: 'FIXED',
    status: 'DRAFT',
    arms: [
      { name: 'Champion', initialSplit: 60, isChampion: true },
      { name: 'Challenger', initialSplit: 40, isChampion: false }
    ]
  });
}

export async function setRunning(id) {
  return j('PATCH', `${BASE}/experiments/${id}`, { status: 'RUNNING', notes: 'Started via UI' });
}

export async function deleteExperiment(id) {
  return j('DELETE', `${BASE}/experiments/${id}`);
}

export async function deleteAll() {
  const list = await listExperiments();
  for (const e of list) {
    try { await deleteExperiment(e.id); } catch { /* ignore */ }
  }
}

export async function addMetric(id, key, value) {
  const v = (typeof value === 'string') ? value.replace(',', '.') : value;
  return j('POST', `${BASE}/experiments/${id}/metrics`, { key, value: Number(v) });
}

export async function seedIfReallyEmpty() {
  const seededKey = 'seeded_v1';
  const all = await listExperiments();
  if (all.length === 0 && !localStorage.getItem(seededKey)) {
    await createExperimentIfNotExistsByName('Smoke Demo');
    localStorage.setItem(seededKey, '1');
  }
}

/** Hilfsfunktionen für Frontend-Logik **/

export function sortByUpdatedDesc(list) {
  return [...list].sort((a,b) => {
    const ua = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const ub = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return ub - ua;
  });
}

/** Duplikate nach Name entfernen – behält das neueste */
export function dedupeByNameKeepNewest(list) {
  const best = new Map();
  for (const e of list) {
    const prev = best.get(e.name);
    if (!prev) { best.set(e.name, e); continue; }
    const pa = new Date(prev.updatedAt || prev.createdAt || 0).getTime();
    const pb = new Date(e.updatedAt || e.createdAt || 0).getTime();
    if (pb > pa) best.set(e.name, e);
  }
  return Array.from(best.values());
}
