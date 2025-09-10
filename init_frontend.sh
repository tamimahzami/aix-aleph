#!/bin/bash
set -e

BASE="aix-aleph-frontend/src"

echo "📂 Lege Ordner an..."
mkdir -p $BASE/{components,pages,lib,marketing}

# --- main entry ---
cat > $BASE/main.jsx <<'EOF'
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./styles.css"

const el = document.getElementById("root")
createRoot(el).render(<App />)
EOF

cat > $BASE/App.jsx <<'EOF'
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard.jsx"
import Experiments from "./pages/Experiments.jsx"
import Funktionen from "./pages/Funktionen.jsx"
import About from "./pages/About.jsx"
import Impressum from "./pages/Impressum.jsx"
import Datenschutz from "./pages/Datenschutz.jsx"
import Home from "./marketing/Home.jsx"
import Features from "./marketing/Features.jsx"
import Pricing from "./marketing/Pricing.jsx"
import Contact from "./marketing/Contact.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/experiments" element={<Experiments />} />
        <Route path="/funktionen" element={<Funktionen />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </BrowserRouter>
  )
}
EOF

cat > $BASE/styles.css <<'EOF'
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f8fafc;
  color: #0f172a;
}
EOF

# --- lib ---
cat > $BASE/lib/api.js <<'EOF'
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5001"

export const api = {
  async health() {
    return fetch(BASE + "/api/health").then(r => r.json())
  },
  async listExperiments() {
    return fetch(BASE + "/api/experiments").then(r => r.json())
  }
}
EOF

cat > $BASE/lib/toast.jsx <<'EOF'
import React, { createContext, useContext, useState } from "react"

const ToastCtx = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function show(msg, type = "info") {
    setToasts([...toasts, { id: Date.now(), msg, type }])
  }
  function error(msg) {
    show(msg, "error")
  }

  return (
    <ToastCtx.Provider value={{ show, error }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
EOF

# --- components ---
cat > $BASE/components/Header.jsx <<'EOF'
import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="p-4 bg-white shadow flex justify-between">
      <div className="font-bold text-blue-600">AIX Aleph</div>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/pricing">Preise</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  )
}
EOF

cat > $BASE/components/Sidebar.jsx <<'EOF'
import React from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
        <li><Link to="/experiments">🧪 Experiments</Link></li>
      </ul>
    </aside>
  )
}
EOF

cat > $BASE/components/Card.jsx <<'EOF'
import React from "react"

export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  )
}
EOF

cat > $BASE/components/Modal.jsx <<'EOF'
import React from "react"

export default function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded p-6 max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2">❌</button>
        {children}
      </div>
    </div>
  )
}
EOF

cat > $BASE/components/Toast.jsx <<'EOF'
import React from "react"

export default function Toast({ message, type }) {
  return (
    <div className={`p-2 rounded ${type === "error" ? "bg-red-500 text-white" : "bg-gray-200"}`}>
      {message}
    </div>
  )
}
EOF

# --- pages ---
cat > $BASE/pages/Dashboard.jsx <<'EOF'
import React, { useEffect, useState } from "react"
import Card from "../components/Card"
import { api } from "../lib/api"
import { useToast } from "../lib/toast"

export default function Dashboard() {
  const [health, setHealth] = useState(null)
  const { error } = useToast()

  useEffect(() => {
    api.health().then(setHealth).catch(e => error(e.message))
  }, [])

  return (
    <div className="p-4 grid gap-4">
      <Card title="API Status">
        {health ? `✅ OK – ${health.env}` : "…prüfe API"}
      </Card>
    </div>
  )
}
EOF

cat > $BASE/pages/Experiments.jsx <<'EOF'
import React, { useEffect, useState } from "react"
import Card from "../components/Card"
import { api } from "../lib/api"

export default function Experiments() {
  const [experiments, setExperiments] = useState([])

  useEffect(() => {
    api.listExperiments().then(setExperiments)
  }, [])

  return (
    <div className="p-4">
      <Card title="Experiments">
        <ul>
          {experiments.map(e => (
            <li key={e.id}>{e.name} — {e.status}</li>
          ))}
          {!experiments.length && <li>Keine Experimente</li>}
        </ul>
      </Card>
    </div>
  )
}
EOF

for page in Funktionen About Impressum Datenschutz; do
cat > $BASE/pages/$page.jsx <<EOF
import React from "react"

export default function $page() {
  return <div className="p-4">$page Seite</div>
}
EOF
done

# --- marketing ---
cat > $BASE/marketing/MarketingLayout.jsx <<'EOF'
import React from "react"
import Header from "../components/Header"

export default function MarketingLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
EOF

cat > $BASE/marketing/Home.jsx <<'EOF'
import React from "react"
import MarketingLayout from "./MarketingLayout"

export default function Home() {
  return (
    <MarketingLayout>
      <section className="p-20 text-center">
        <h1 className="text-4xl font-bold">Die Zukunft der E-Mobility beginnt mit AIX Aleph</h1>
        <p className="mt-4">Eine Plattform, die Unternehmen hilft, ihre Flotten emissionsfrei zu machen.</p>
      </section>
    </MarketingLayout>
  )
}
EOF

for page in Features Pricing About Contact; do
cat > $BASE/marketing/$page.jsx <<EOF
import React from "react"
import MarketingLayout from "./MarketingLayout"

export default function $page() {
  return (
    <MarketingLayout>
      <section className="p-20">
        <h2 className="text-3xl font-bold">$page</h2>
        <p>Inhalt für $page Seite 🚀</p>
      </section>
    </MarketingLayout>
  )
}
EOF
done

echo "✅ Frontend-Struktur mit Dummy-Inhalten erstellt."
