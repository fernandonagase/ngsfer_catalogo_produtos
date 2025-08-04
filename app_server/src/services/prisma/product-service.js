const prisma = require("../../infra/prisma");

function getAllProducts() {
  return prisma.Produto.findMany();
}

function findProductById(id) {
  return prisma.Produto.findUnique({ where: { id } });
}

module.exports = {
  getAllProducts,
  findProductById,
};
