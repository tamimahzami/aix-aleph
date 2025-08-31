require('dotenv').config();
const express = require('express');
const app = express();
app.get('/health', (_req,res)=>res.json({ok:true, ts:Date.now()}));
const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=> console.log(`TMP läuft auf http://localhost:${PORT}`));
