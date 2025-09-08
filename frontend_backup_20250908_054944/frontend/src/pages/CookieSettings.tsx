// in CookieSettings.tsx
import { useCookieConsent } from "../hooks/useCookieConsent";
export default function CookieSettings() {
  const { consent, update } = useCookieConsent();
  const [analytics, setAnalytics] = React.useState(!!consent?.analytics);
  const [marketing, setMarketing] = React.useState(!!consent?.marketing);

  return (
    <div className="max-w-xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-4">Cookie-Einstellungen</h1>
      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-5 w-5" checked disabled />
          <span>Essenzielle Cookies (immer aktiv)</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-5 w-5" checked={analytics} onChange={(e)=>setAnalytics(e.target.checked)} />
          <span>Analyse-Cookies</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-5 w-5" checked={marketing} onChange={(e)=>setMarketing(e.target.checked)} />
          <span>Marketing-Cookies</span>
        </label>
        <button
          onClick={() => update({ analytics, marketing })}
          className="mt-6 w-full rounded-xl py-3 bg-white/10 hover:bg-white/20 transition"
        >
          Speichern
        </button>
      </div>
    </div>
  );
}
