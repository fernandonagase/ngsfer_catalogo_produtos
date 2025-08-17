const Tenant = require("../models/tenant.js");
const { findTenantBySubdomain: doFindTenantBySubdomain } = require("../services/tenant-service.js");

async function findTenantBySubdomain(subdomain) {
  const tenant = await doFindTenantBySubdomain(subdomain);
  return tenant ? new Tenant(tenant) : null;
}

module.exports = { findTenantBySubdomain };
