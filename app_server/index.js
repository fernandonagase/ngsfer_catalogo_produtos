const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const db = require('./db.js');

app.get('/tenant', (req, res) => {
  const tenant = req.headers['x-tenant-id'];
  if (db[tenant]) {
    res.json(db[tenant]);
  } else {
    res.status(404).send('Tenant not found');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});