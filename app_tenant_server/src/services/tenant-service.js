const prisma = require("../infra/prisma");

function findTenantBySubdomain(subdomain, include) {
  return prisma.Tenant.findUnique({
    where: { subdomain },
    include,
  });
}

module.exports = { findTenantBySubdomain };
