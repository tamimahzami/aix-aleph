import { useEffect, useState } from 'react';
import { subscribe } from '../lib/toast';

export default function Toast() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = subscribe((payload) => {
      setItems(prev => [...prev, payload]);
      if (payload.timeout) {
        setTimeout(() => {
          setItems(prev => prev.filter(i => i.id !== payload.id));
        }, payload.timeout);
      }
    });
    return unsub;
  }, []);

  const color = (type) => ({
    success: 'bg-emerald-600',
    error: 'bg-rose-600',
    info: 'bg-slate-800'
  }[type] || 'bg-slate-800');

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {items.map(i => (
        <div key={i.id} className={`text-white ${color(i.type)} rounded-md shadow-lg px-4 py-3 min-w-[280px]`}>
          <div className="font-semibold">{i.title}</div>
          {i.message && <div className="text-sm opacity-90">{i.message}</div>}
        </div>
      ))}
    </div>
  );
}
