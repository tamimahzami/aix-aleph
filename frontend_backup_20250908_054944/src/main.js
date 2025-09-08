// src/main.js — AIX Aleph Frontend (final)

const API_BASE = '/api';

const api = {
  async health() {
    try {
      const r = await fetch(`${API_BASE}/health`);
      return await r.json();
    } catch {
      return { ok: false };
    }
  },

  async list() {
    const r = await fetch(`${API_BASE}/experiments`);
    if (!r.ok) throw new Error('list failed');
    return r.json();
  },

  async create() {
    const payload = {
      name: 'Smoke Demo',
      type: 'AB',
      strategy: 'FIXED',
      arms: [
        { name: 'Champion', initialSplit: 60, isChampion: true },
        { name: 'Challenger', initialSplit: 40 }
      ]
    };
    const r = await fetch(`${API_BASE}/experiments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return r.json();
  },

  async setRunning(id) {
    const r = await fetch(`${API_BASE}/experiments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'RUNNING', notes: 'Started via UI' })
    });
    return r.json();
  },

  async remove(id) {
    const r = await fetch(`${API_BASE}/experiments/${id}`, { method: 'DELETE' });
    return r.json();
  },

  async addMetric(id, key, value) {
    const r = await fetch(`${API_BASE}/experiments/${id}/metrics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: String(key), value: Number(value) })
    });
    return r.json();
  }
};

// ============== DOM helpers ==============
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.substring(2), v);
    else if (v != null) n.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    n.append(c instanceof Node ? c : document.createTextNode(String(c)));
  });
  return n;
}

function safeNum(n, fallback = '-') {
  const x = Number(n);
  return Number.isFinite(x) ? x : fallback;
}

function toast(msg, type = 'info') {
  console.log(`[${type}]`, msg);
  const t = el('div', { class: `toast ${type}` }, msg);
  Object.assign(t.style, {
    position: 'fixed',
    right: '12px',
    bottom: '12px',
    padding: '10px 12px',
    background: type === 'error' ? '#fdd' : type === 'success' ? '#dfd' : '#eee',
    color: '#222',
    border: '1px solid #ccc',
    borderRadius: '8px',
    zIndex: 9999
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// ============== Rendering ==============
function renderHealth(h) {
  // optional: wenn im HTML entsprechende Container existieren
  const healthBox = $('#backend-json') || $('#health-backend') || null;
  if (healthBox) {
    healthBox.textContent = JSON.stringify(h, null, 2);
  }
}

function armLine(a) {
  const split = a?.initialSplit ?? a?.split ?? a?.minSplit ?? null;
  const bits = [];
  if (a?.name) bits.push(a.name);
  if (split != null) bits.push(`aufgeteilt ${safeNum(split)}%`);
  if (a?.isChampion) bits.push('– Champion');
  return bits.join(' ');
}

function metricBadge(m) {
  return el('span', { class: 'metric-badge' }, `${m.key}: ${m.value}`);
}

function renderCards(items) {
  const wrap = $('#cards');
  if (!wrap) return;
  wrap.innerHTML = '';

  if (!items || items.length === 0) {
    wrap.append(el('div', { class: 'empty' }, 'Keine Experimente vorhanden.'));
    return;
  }

  items.forEach(x => {
    const arms = (x.arms || []).map(arm => el('li', {}, armLine(arm)));
    const metrics = (x.metrics || []).map(metricBadge);

    const quickMetricBtn = el(
      'button',
      { class: 'secondary', onclick: async () => {
        try {
          const r = await api.addMetric(x.id, 'ctr', 0.42);
          if (r?.id || r?.ok !== false) {
            toast('Metrik hinzugefügt', 'success');
            await refreshList();
          } else {
            throw new Error(r?.error || 'add metric failed');
          }
        } catch (e) {
          toast(`Fehler: ${e.message}`, 'error');
        }
      }},
      '+ ctr=0.42'
    );

    const runBtn = el(
      'button',
      { onclick: async () => {
        try {
          const r = await api.setRunning(x.id);
          if (r?.id || r?.ok !== false) {
            toast('Status auf RUNNING gesetzt', 'success');
            await refreshList();
          } else {
            throw new Error(r?.error || 'set running failed');
          }
        } catch (e) {
          toast(`Fehler: ${e.message}`, 'error');
        }
      }},
      'Set RUNNING'
    );

    const delBtn = el(
      'button',
      { class: 'danger', onclick: async () => {
        if (!confirm('Experiment wirklich löschen?')) return;
        try {
          const r = await api.remove(x.id);
          if (r?.ok === false) throw new Error(r?.error || 'delete failed');
          toast('Experiment gelöscht', 'success');
          await refreshList();
        } catch (e) {
          toast(`Fehler: ${e.message}`, 'error');
        }
      }},
      'Löschen'
    );

    const meta = [
      `ID: ${x.id}`,
      `Strategie: ${x.strategy ?? '-'}`,
      `${x.status ?? '-'} Entscheidung: ${x.decision ?? 'UNDECIDED'}`
    ].join('   ');

    const card = el('div', { class: 'card' }, [
      el('div', { class: 'card-head' }, [
        el('h3', {}, `${x.name} (${x.status || 'DRAFT'})`),
        el('div', { class: 'meta' }, meta)
      ]),
      el('div', { class: 'arms' }, [
        el('ul', {}, arms.length ? arms : [el('li', {}, '—')])
      ]),
      el('div', { class: 'metrics' }, metrics.length ? metrics : []),
      el('div', { class: 'actions-row' }, [runBtn, quickMetricBtn, delBtn])
    ]);

    wrap.append(card);
  });
}

// ============== Actions ==============
async function refreshList() {
  try {
    const items = await api.list();
    renderCards(items);
  } catch (e) {
    toast(`Laden fehlgeschlagen: ${e.message}`, 'error');
  }
}

async function createExperiment() {
  try {
    const r = await api.create();
    if (r?.id || r?.ok !== false) {
      toast('Experiment erstellt', 'success');
      await refreshList();
    } else {
      throw new Error(r?.error || 'create failed');
    }
  } catch (e) {
    toast(`Fehler: ${e.message}`, 'error');
  }
}

async function dedupeByNameKeepNewest() {
  try {
    const items = await api.list();
    if (!Array.isArray(items) || items.length === 0) return;

    // gruppieren nach name
    const byName = new Map();
    for (const x of items) {
      if (!byName.has(x.name)) byName.set(x.name, []);
      byName.get(x.name).push(x);
    }

    let deleted = 0;
    for (const [, list] of byName.entries()) {
      if (list.length <= 1) continue;
      // jüngstes behalten (nach createdAt/updatedAt/id Fallback)
      const sorted = list.slice().sort((a, b) => {
        const aa = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const bb = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return bb - aa;
      });
      const keep = sorted[0];
      const drop = sorted.slice(1);
      for (const d of drop) {
        const r = await api.remove(d.id);
        if (r?.ok === false) throw new Error(r?.error || 'delete failed');
        deleted++;
      }
    }
    toast(`Duplikate bereinigt: ${deleted} entfernt`, 'success');
    await refreshList();
  } catch (e) {
    toast(`Bereinigung fehlgeschlagen: ${e.message}`, 'error');
  }
}

async function deleteAll() {
  if (!confirm('Wirklich ALLE Experimente löschen?')) return;
  try {
    const items = await api.list();
    for (const x of (items || [])) {
      const r = await api.remove(x.id);
      if (r?.ok === false) throw new Error(r?.error || 'delete failed');
    }
    toast('Alle Experimente gelöscht', 'success');
    await refreshList();
  } catch (e) {
    toast(`Fehler: ${e.message}`, 'error');
  }
}

// ============== Metric Form ==============
function setupMetricForm() {
  const form = $('#form-metric');
  const exp = $('#mf-exp');
  const key = $('#mf-key');
  const val = $('#mf-val');
  if (!form) return;

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    try {
      const id = exp?.value?.trim();
      const k = key?.value?.trim();
      const v = Number(val?.value);

      if (!id) throw new Error('Experiment-ID fehlt');
      if (!k) throw new Error('metrischer Key fehlt');
      if (!Number.isFinite(v)) throw new Error('Wert muss Zahl sein');

      const r = await api.addMetric(id, k, v);
      if (r?.ok === false) throw new Error(r?.error || 'add metric failed');

      toast('Metrik gespeichert', 'success');
      form.reset();
      await refreshList();
    } catch (e) {
      toast(`Fehler: ${e.message}`, 'error');
    }
  });
}

// ============== Boot ==============
async function boot() {
  // Buttons
  $('#btn-create')?.addEventListener('click', createExperiment);
  $('#btn-refresh')?.addEventListener('click', refreshList);
  $('#btn-dedupe')?.addEventListener('click', dedupeByNameKeepNewest);
  $('#btn-delete-all')?.addEventListener('click', deleteAll);

  setupMetricForm();

  // Health
  const h = await api.health();
  renderHealth(h);

  // Liste initial
  await refreshList();
}

document.addEventListener('DOMContentLoaded', boot);
