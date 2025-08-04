const prisma = require("../../infra/prisma");

function getAllProducts({ include } = {}) {
  return prisma.Produto.findMany({ include });
}

function findProductById(id, { include } = {}) {
  return prisma.Produto.findUnique({ where: { id }, include });
}

module.exports = {
  getAllProducts,
  findProductById,
};
