const prisma = require("../../infra/prisma");

function getAllProducts({ include, page = 1, pageSize = 15 } = {}) {
  return prisma.Produto.findMany({ 
    include,
    skip: (page - 1) * pageSize,
    take: pageSize
  });
}

function findProductById(id, { include } = {}) {
  return prisma.Produto.findUnique({ where: { id }, include });
}

module.exports = {
  getAllProducts,
  findProductById,
};
