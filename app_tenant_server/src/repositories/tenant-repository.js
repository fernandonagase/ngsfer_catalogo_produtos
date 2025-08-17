const db = require("../db.js");
const Tenant = require("../models/tenant.js");

function findTenantBySubdomain(subdomain) {
  return db[subdomain] ? new Tenant(db[subdomain]) : null;
}

module.exports = { findTenantBySubdomain };
