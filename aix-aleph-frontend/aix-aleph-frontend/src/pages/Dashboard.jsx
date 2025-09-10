import Card from '../components/Card.jsx';

export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Schnellstart">
        <ul className="list-disc ml-5 space-y-1 text-sm">
          <li>Backend-Status oben rechts checken</li>
          <li>Zu <b>Experimente</b> wechseln und Einträge anlegen</li>
          <li>CRUD testen (Create/Update/Delete)</li>
        </ul>
      </Card>
      <Card title="KPIs (Demo)">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="card p-3">
            <div className="text-slate-500">Aktive Fahrzeuge</div>
            <div className="text-2xl font-bold">24</div>
          </div>
          <div className="card p-3">
            <div className="text-slate-500">Ladevorgänge heute</div>
            <div className="text-2xl font-bold">17</div>
          </div>
        </div>
      </Card>
      <Card title="Hinweis">
        <p className="text-sm text-slate-600">
          Dieses UI ist minimal gehalten, damit du schnell ans Ziel kommst.
          Design/Module lassen sich später modular erweitern.
        </p>
      </Card>
    </div>
  );
}
