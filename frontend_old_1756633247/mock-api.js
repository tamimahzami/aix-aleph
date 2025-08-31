const http = require('http');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Vary','Origin');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  res.setHeader('Content-Type','application/json');

  const ok = (d) => res.end(JSON.stringify(d));
  if (req.url === '/health' || req.url === '/api/health') ok({ ok:true, service:'mock-api', ts:Date.now() });
  else if (req.url === '/status') ok({ status:'ok', ts:Date.now() });
  else { res.statusCode = 404; ok({ error:'not found', path:req.url }); }
});

server.listen(port, () => console.log('mock api on :' + port));
