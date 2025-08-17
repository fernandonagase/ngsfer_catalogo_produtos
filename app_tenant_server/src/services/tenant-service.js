const prisma = require("../infra/prisma");

function findTenantBySubdomain(subdomain) {
  return prisma.Tenant.findUnique({ where: { subdomain } });
}

module.exports = { findTenantBySubdomain };
