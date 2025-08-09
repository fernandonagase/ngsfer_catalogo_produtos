const prisma = require("../../infra/prisma");

function getAllProducts({ include, page = 1, pageSize = 15 } = {}) {
  return prisma.Produto.findMany({ 
    include,
    skip: (page - 1) * pageSize,
    take: pageSize
  });
}

async function getAllProductsV2({ include, page = 1, pageSize = 15 } = {}) {
  const [products, totalCount] = await prisma.$transaction([
    prisma.Produto.findMany({ 
      include,
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.Produto.count()
  ]);
  return {
    data: products,
    pageCount: Math.ceil(totalCount / pageSize),
  };
}

function findProductById(id, { include } = {}) {
  return prisma.Produto.findUnique({ where: { id }, include });
}

module.exports = {
  getAllProducts,
  getAllProductsV2,
  findProductById,
};
