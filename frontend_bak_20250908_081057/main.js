const $list = document.getElementById('list');
const $create = document.getElementById('btn-create');
const $refresh = document.getElementById('btn-refresh');
const $status = document.getElementById('status');
const $healthBackend = document.getElementById('health-backend');

const api = {
  async get(path) {
    const r = await fetch(path);
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  },
  async send(path, method = 'POST', body) {
    const r = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json().catch(() => ({}));
  }
};

function toast(msg, ok=true) {
  $status.textContent = msg;
  $status.style.opacity = '1';
  $status.style.color = ok ? '#7dff9c' : '#ff9d7d';
  setTimeout(() => ($status.style.opacity = '0.6'), 1500);
}

async function loadHealth() {
  try {
    const hb = await api.get('/api/health');
    $healthBackend.textContent = JSON.stringify(hb, null, 2);
  } catch (e) {
    $healthBackend.textContent = `ERROR: ${e.message}`;
  }
}

function armLine(a) {
  const badge = a.isChampion ? 'Champion' : 'Challenger';
  return `${a.name} · split ${a.initialSplit}% <span class="badge">${badge}</span>`;
}

function expItem(exp) {
  const li = document.createElement('li');
  li.className = 'card';

  const top = document.createElement('div');
  top.className = 'row';

  const left = document.createElement('div');
  left.innerHTML = `<div class="card-title">${exp.name} <span class="badge">${exp.status}</span></div>
    <div class="meta">id: ${exp.id}</div>
    <div class="meta">strategy: ${exp.strategy || '—'} | decision: ${exp.decision}</div>`;

  const btns = document.createElement('div');
  btns.className = 'btns';

  const btnRun = document.createElement('button');
  btnRun.textContent = 'Set RUNNING';
  btnRun.onclick = async () => {
    try {
      await api.send(`/api/experiments/${exp.id}`, 'PATCH', {
        status: 'RUNNING', notes: 'Started via UI'
      });
      toast('Experiment auf RUNNING gesetzt');
      await load();
    } catch (e) { toast(e.message, false); }
  };

  const btnMetric = document.createElement('button');
  btnMetric.textContent = 'Add metric ctr=0.42';
  btnMetric.onclick = async () => {
    try {
      await api.send(`/api/experiments/${exp.id}/metrics`, 'POST', {
        key: 'ctr', value: 0.42
      });
      toast('Metric hinzugefügt');
      await load();
    } catch (e) { toast(e.message, false); }
  };

  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'Löschen';
  btnDelete.onclick = async () => {
    if (!confirm('Wirklich löschen?')) return;
    try {
      await api.send(`/api/experiments/${exp.id}`, 'DELETE');
      toast('Gelöscht');
      await load();
    } catch (e) { toast(e.message, false); }
  };

  btns.append(btnRun, btnMetric, btnDelete);
  top.append(left, btns);

  const arms = document.createElement('div');
  arms.style.marginTop = '8px';
  arms.innerHTML = (exp.arms || [])
    .map(a => `<div class="meta">${armLine(a)}</div>`).join('');

  li.append(top, arms);
  return li;
}

async function load() {
  $list.innerHTML = '<li class="card">Laden…</li>';
  try {
    const data = await api.get('/api/experiments');
    $list.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      $list.innerHTML = '<li class="card">Keine Experimente vorhanden.</li>';
      return;
    }
    data.forEach(exp => $list.appendChild(expItem(exp)));
  } catch (e) {
    $list.innerHTML = `<li class="card">Fehler: ${e.message}</li>`;
  }
}

$create.onclick = async () => {
  try {
    await api.send('/api/experiments', 'POST', {
      name: 'Smoke Demo',
      description: 'script',
      type: 'AB',
      status: 'DRAFT',
      strategy: 'FIXED',
      arms: [
        { name: 'Champion', initialSplit: 60, isChampion: true },
        { name: 'Challenger', initialSplit: 40, isChampion: false }
      ]
    });
    toast('Experiment angelegt');
    await load();
  } catch (e) { toast(e.message, false); }
};
$refresh.onclick = load;

// initial
await loadHealth();
await load();
