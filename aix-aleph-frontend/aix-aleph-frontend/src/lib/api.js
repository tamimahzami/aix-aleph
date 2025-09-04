// src/lib/api.js
// Default: relative BASE -> nutzt Nginx Proxy (/api → backend:5001) im Docker
// Lokal (Vite dev) kannst du VITE_API_URL=http://localhost:5001 setzen.
const BASE = (import.meta?.env?.VITE_API_URL ?? '').trim();

async function http(path, { method = 'GET', body, headers } = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} @ ${url}: ${text || '(no body)'}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Experiments
export async function getExperiments() {
  return http('/api/experiments');
}
export async function listExperiments() { // alias
  return getExperiments();
}

export async function getExperiment(id) {
  if (!id) throw new Error('getExperiment: id ist erforderlich');
  return http(`/api/experiments/${encodeURIComponent(id)}`);
}

export async function createExperiment(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('createExperiment: payload ist erforderlich');
  // Minimal-Defaults: type/status/strategy erleichtern Seeds & Backend-Validierung
  const withDefaults = {
    type: 'AB',
    status: 'DRAFT',
    strategy: 'FIXED',
    ...payload,
  };
  return http('/api/experiments', { method: 'POST', body: withDefaults });
}

export async function patchExperiment(id, payload) {
  if (!id) throw new Error('patchExperiment: id ist erforderlich');
  if (!payload || typeof payload !== 'object') throw new Error('patchExperiment: payload ist erforderlich');
  return http(`/api/experiments/${encodeURIComponent(id)}`, { method: 'PATCH', body: payload });
}

export async function deleteExperiment(id) {
  if (!id) throw new Error('deleteExperiment: id ist erforderlich');
  return http(`/api/experiments/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

// Metrics
export async function addMetric(experimentId, payload) {
  if (!experimentId) throw new Error('addMetric: experimentId ist erforderlich');
  if (!payload || typeof payload !== 'object') throw new Error('addMetric: payload ist erforderlich');
  return http(`/api/experiments/${encodeURIComponent(experimentId)}/metrics`, {
    method: 'POST',
    body: payload,
  });
}

// Health
export async function health() {
  return http('/api/health');
}

// Gebündelter Export
export const api = {
  getExperiments,
  listExperiments,
  getExperiment,
  createExperiment,
  patchExperiment,
  deleteExperiment,
  addMetric,
  health,
};

export default api;
