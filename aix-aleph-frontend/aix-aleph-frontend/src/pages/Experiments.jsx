// src/pages/Experiments.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import Modal from '../components/Modal';

function Field({ label, children }) {
  return (
    <label style={{display:'grid', gap:6, marginBottom:12}}>
      <span style={{fontSize:12, color:'#374151', fontWeight:600}}>{label}</span>
      {children}
    </label>
  );
}
function Input(props){ return <input {...props} style={{...ipt, ...(props.style||{})}}/>; }
function Textarea(props){ return <textarea {...props} style={{...ipt, minHeight:90, ...(props.style||{})}}/>; }
const ipt = { padding:'10px 12px', border:'1px solid #e5e7eb', borderRadius:8, outline:'none' };

export default function Experiments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [metricOpen, setMetricOpen] = useState(false);

  const [createForm, setCreateForm] = useState({ name:'', description:'' });
  const [editForm, setEditForm] = useState({ id:'', name:'', description:'', status:'DRAFT', strategy:'FIXED', type:'AB' });
  const [metricForm, setMetricForm] = useState({ experimentId:'', key:'ctr', value:'', armId:'' });

  const [selected, setSelected] = useState(null);

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await api.getExperiments();
      // defensive: falls API [] liefert
      setItems(Array.isArray(data) ? data : []);
      setErr('');
    } catch (e) {
      console.error(e);
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const onCreate = async () => {
    if (!createForm.name.trim()) return alert('Name ist erforderlich.');
    try {
      await api.createExperiment({ name: createForm.name.trim(), description: createForm.description?.trim() || undefined });
      setCreateOpen(false);
      setCreateForm({ name:'', description:'' });
      await refresh();
    } catch (e) {
      alert(e.message || e);
    }
  };

  const onEditOpen = (row) => {
    setSelected(row);
    setEditForm({
      id: row.id,
      name: row.name ?? '',
      description: row.description ?? '',
      status: row.status ?? 'DRAFT',
      type: row.type ?? 'AB',
      strategy: row.strategy ?? 'FIXED',
    });
    setEditOpen(true);
  };

  const onEdit = async () => {
    try {
      const { id, ...payload } = editForm;
      await api.patchExperiment(id, payload);
      setEditOpen(false);
      await refresh();
    } catch (e) {
      alert(e.message || e);
    }
  };

  const onDelete = async (row) => {
    if (!confirm(`Experiment „${row.name}“ wirklich löschen?`)) return;
    try {
      await api.deleteExperiment(row.id);
      await refresh();
    } catch (e) {
      alert(e.message || e);
    }
  };

  const onMetricOpen = (row) => {
    setSelected(row);
    setMetricForm({ experimentId: row.id, key:'ctr', value:'', armId:'' });
    setMetricOpen(true);
  };

  const onMetricCreate = async () => {
    const payload = {
      key: String(metricForm.key || '').trim(),
      value: Number(metricForm.value),
    };
    if (Number.isNaN(payload.value)) return alert('Value muss eine Zahl sein.');
    if (metricForm.armId) payload.armId = metricForm.armId;
    try {
      await api.addMetric(metricForm.experimentId, payload);
      setMetricOpen(false);
      await refresh();
    } catch (e) {
      alert(e.message || e);
    }
  };

  const armsByExperiment = useMemo(() => {
    const map = {};
    for (const x of items) map[x.id] = Array.isArray(x.arms) ? x.arms : [];
    return map;
  }, [items]);

  return (
    <div style={{display:'grid', gap:16}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <h2 style={{margin:0, fontSize:'1.5rem'}}>Experimente</h2>
        <div style={{display:'flex', gap:8}}>
          <button onClick={refresh} className="btn-outline">Neu laden</button>
          <button onClick={()=>setCreateOpen(true)} className="btn-primary">+ Neues Experiment</button>
        </div>
      </div>

      {err && <div style={{background:'#fee2e2', color:'#991b1b', padding:'10px 12px', borderRadius:8}}>Fehler: {err}</div>}
      {loading ? (
        <div>lädt…</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Typ</th>
                <th>Status</th>
                <th>Strategie</th>
                <th>Arms</th>
                <th>Erstellt</th>
                <th style={{width:220}}>Aktionen</th>
              </tr>
            </thead>
            <tbody>
            {(items.length ? items : []).map((row) => {
              const arms = armsByExperiment[row.id] || [];
              return (
                <tr key={row.id}>
                  <td>{row.name || '—'}</td>
                  <td>{row.type || '—'}</td>
                  <td>
                    <span className={`status-badge ${row.status === 'RUNNING' ? 'active': row.status === 'DRAFT' ? 'inactive' : 'warning'}`}>
                      {row.status || '—'}
                    </span>
                  </td>
                  <td>{row.strategy || '—'}</td>
                  <td>{arms.length}</td>
                  <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
                  <td style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                    <button className="btn-outline" onClick={()=>onEditOpen(row)}>Bearbeiten</button>
                    <button className="btn-outline" onClick={()=>onMetricOpen(row)}>+ Metrik</button>
                    <button className="btn-danger" onClick={()=>onDelete(row)}>Löschen</button>
                  </td>
                </tr>
              );
            })}
            {!items.length && (
              <tr><td colSpan="7" style={{textAlign:'center', padding:'1rem'}}>Keine Experimente vorhanden.</td></tr>
            )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Modal */}
      <Modal
        open={createOpen}
        title="Neues Experiment anlegen"
        onClose={()=>setCreateOpen(false)}
        footer={(
          <>
            <button className="btn-outline" onClick={()=>setCreateOpen(false)}>Abbrechen</button>
            <button className="btn-primary" onClick={onCreate}>Anlegen</button>
          </>
        )}
      >
        <Field label="Name *">
          <Input value={createForm.name} onChange={e=>setCreateForm(s=>({...s, name: e.target.value}))} placeholder="z. B. Smoke Demo"/>
        </Field>
        <Field label="Beschreibung">
          <Textarea value={createForm.description} onChange={e=>setCreateForm(s=>({...s, description: e.target.value}))} placeholder="optional"/>
        </Field>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={editOpen}
        title={`Experiment bearbeiten`}
        onClose={()=>setEditOpen(false)}
        footer={(
          <>
            <button className="btn-outline" onClick={()=>setEditOpen(false)}>Abbrechen</button>
            <button className="btn-primary" onClick={onEdit}>Speichern</button>
          </>
        )}
      >
        <Field label="Name *">
          <Input value={editForm.name} onChange={e=>setEditForm(s=>({...s, name: e.target.value}))}/>
        </Field>
        <Field label="Beschreibung">
          <Textarea value={editForm.description} onChange={e=>setEditForm(s=>({...s, description: e.target.value}))}/>
        </Field>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
          <Field label="Typ">
            <Input value={editForm.type} onChange={e=>setEditForm(s=>({...s, type: e.target.value}))}/>
          </Field>
          <Field label="Status">
            <Input value={editForm.status} onChange={e=>setEditForm(s=>({...s, status: e.target.value}))}/>
          </Field>
          <Field label="Strategie">
            <Input value={editForm.strategy} onChange={e=>setEditForm(s=>({...s, strategy: e.target.value}))}/>
          </Field>
        </div>
      </Modal>

      {/* Metric Modal */}
      <Modal
        open={metricOpen}
        title={`Metrik zu „${selected?.name ?? ''}“ hinzufügen`}
        onClose={()=>setMetricOpen(false)}
        footer={(
          <>
            <button className="btn-outline" onClick={()=>setMetricOpen(false)}>Abbrechen</button>
            <button className="btn-primary" onClick={onMetricCreate}>Hinzufügen</button>
          </>
        )}
      >
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <Field label="Key">
            <Input value={metricForm.key} onChange={e=>setMetricForm(s=>({...s, key: e.target.value}))} placeholder="z. B. ctr"/>
          </Field>
          <Field label="Wert">
            <Input value={metricForm.value} onChange={e=>setMetricForm(s=>({...s, value: e.target.value}))} placeholder="z. B. 0.42"/>
          </Field>
        </div>
        <Field label="Arm (optional)">
          <select
            value={metricForm.armId}
            onChange={e=>setMetricForm(s=>({...s, armId: e.target.value}))}
            style={{...ipt}}
          >
            <option value="">— keiner —</option>
            {(armsByExperiment[selected?.id] || []).map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </Field>
      </Modal>
    </div>
  );
}
