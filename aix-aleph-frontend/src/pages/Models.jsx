import React, { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import { useToast } from '../lib/toast.jsx'

// Endpoint OHNE /api, weil base unten bereits /api liefern kann
const MODELS_ENDPOINT = '/models'

export default function Models(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { show } = useToast()

  useEffect(()=>{
    let isMounted = true
    async function load(){
      try{
        const base = import.meta.env.VITE_API_URL || '/api'
        const res = await fetch(base + MODELS_ENDPOINT)
        if(!res.ok){
          // Placeholder, falls /models noch nicht existiert
          if (!isMounted) return
          setItems([
            { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', status: 'AVAILABLE' },
            { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'OpenAI', status: 'DEPRECATED' },
            { id: 'local-llama', name: 'Local LLaMA', provider: 'Local', status: 'EXPERIMENTAL' },
          ])
          setLoading(false)
          return
        }
        const data = await res.json()
        if (!isMounted) return
        setItems(Array.isArray(data) ? data : (data.items || []))
        setLoading(false)
      }catch(e){
        if (!isMounted) return
        show(e.message || String(e), 'error')
        setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [show])

  return (
    <div className="grid gap-6">
      <Card title="AI Models">
        {loading ? <div className="text-sm">…lade</div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Provider</th>
                  <th className="py-2 pr-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map(m=>(
                  <tr key={m.id} className="border-t">
                    <td className="py-2 pr-3 font-mono">{m.id}</td>
                    <td className="py-2 pr-3">{m.name}</td>
                    <td className="py-2 pr-3">{m.provider || '-'}</td>
                    <td className="py-2 pr-3">
                      <span className="uppercase text-xs">{m.status || '-'}</span>
                    </td>
                  </tr>
                ))}
                {!items.length && (
                  <tr><td className="py-6 text-center text-slate-500" colSpan={4}>Keine Modelle</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
