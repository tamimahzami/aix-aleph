const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
(async () => {
  const base = `http://127.0.0.1:${process.env.PORT||5001}`;
  const r = await fetch(`${base}/api/bootstrap`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
  const j = await r.json();
  console.log(JSON.stringify(j, null, 2));
})();
