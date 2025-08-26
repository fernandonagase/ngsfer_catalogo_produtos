const Tenant = require("../models/tenant.js");
const {
  findTenantBySubdomain: doFindTenantBySubdomain,
} = require("../services/tenant-service.js");

async function findTenantBySubdomain(subdomain, include) {
  const tenant = await doFindTenantBySubdomain(subdomain, include);
  return tenant ? new Tenant(tenant) : null;
}

module.exports = { findTenantBySubdomain };
