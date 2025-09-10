import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toast from './components/Toast.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Experiments from './pages/Experiments.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container-app grid grid-cols-12 gap-4 py-4">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <Sidebar />
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="space-y-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/experiments" element={<Experiments />} />
              <Route path="*" element={<div className="card p-6">404 – Seite nicht gefunden</div>} />
            </Routes>
          </div>
        </main>
      </div>
      <Toast />
    </div>
  );
}
