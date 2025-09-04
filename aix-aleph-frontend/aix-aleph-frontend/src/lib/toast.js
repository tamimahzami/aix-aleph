// superleichter Toast-Bus
const subs = new Set();

export function subscribe(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}

export function toast({ title, message, type = 'info', timeout = 3500 }) {
  const payload = { id: crypto.randomUUID(), title, message, type, timeout };
  subs.forEach(fn => fn(payload));
}

export const toastSuccess = (m, t = 'Erfolg') => toast({ title: t, message: m, type: 'success' });
export const toastError   = (m, t = 'Fehler') => toast({ title: t, message: m, type: 'error' });
export const toastInfo    = (m, t = 'Info')   => toast({ title: t, message: m, type: 'info' });
