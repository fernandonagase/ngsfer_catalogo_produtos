const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const { findTenantBySubdomain } = require('./src/repositories/tenant-repository.js');
const TenantDto = require('./src/dtos/tenant-dto.js');

app.get('/tenant', async (req, res) => {
  const tenantSubdomain = req.headers['x-tenant-id'];
  const tenant = await findTenantBySubdomain(tenantSubdomain);
  if (tenant) {
    res.json(new TenantDto(tenant));
  } else {
    res.status(404).send('Tenant inexistente');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});