import Card from "../components/Card.jsx";

export default function Health() {
  const [data, setData] = React.useState(null);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || "/api") + "/health")
      .then(r => r.json())
      .then(setData)
      .catch(e => setErr(e.message || String(e)));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card title="Service Health">
        {err && <div className="text-red-400">Fehler: {err}</div>}
        {!data && !err && <div className="text-gray-400">Lade…</div>}
        {data && (
          <ul className="text-sm text-gray-300">
            <li><strong>ok:</strong> {String(data.ok)}</li>
            <li><strong>env:</strong> {data.env}</li>
          </ul>
        )}
      </Card>
      <Card title="Hinweis">
        <p className="text-gray-400">Dieser Check ruft <code>/api/health</code> am Backend auf.</p>
      </Card>
    </div>
  );
}
