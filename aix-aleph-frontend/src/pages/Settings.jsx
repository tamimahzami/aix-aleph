import React, { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import { useToast } from '../lib/toast.jsx'

export default function Settings(){
  const [base, setBase] = useState(import.meta.env.VITE_API_URL || 'http://localhost:5001')
  const { success } = useToast()

  useEffect(()=>{
    // rein informativ
  }, [])

  function copyEnv(){
    navigator.clipboard.writeText(`VITE_API_URL=${base}`)
    success('In Zwischenablage kopiert')
  }

  return (
    <div className="grid gap-6">
      <Card title="Einstellungen">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <label className="grid gap-1">
            <span>API Base URL (read-only aus .env)</span>
            <input value={base} readOnly className="px-3 py-2 border rounded-lg bg-slate-50"/>
          </label>
          <div className="flex items-end">
            <button onClick={copyEnv} className="px-3 py-2 bg-brand text-white rounded-lg">
              .env Snippet kopieren
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
