const prisma = require("../../infra/prisma");

function getAllProducts({ include, page = 1, pageSize = 15 } = {}) {
  return prisma.Produto.findMany({ 
    include,
    skip: (page - 1) * pageSize,
    take: pageSize
  });
}

async function getAllProductsV2({ include, page = 1, pageSize = 15, searchText = "" } = {}) {
  const [products, totalCount] = await prisma.$transaction([
    prisma.Produto.findMany({ 
      include,
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        OR: [
          { nome: { contains: searchText, mode: "insensitive" } },
          { descricao: { contains: searchText, mode: "insensitive" } },
          { slug: { contains: searchText, mode: "insensitive" } },
          { marca: { nome: { contains: searchText, mode: "insensitive" } } }
        ]
      }
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

function findProductBySlug(slug, { include } = {}) {
  return prisma.Produto.findUnique({ where: { slug }, include });
}

module.exports = {
  getAllProducts,
  getAllProductsV2,
  findProductById,
  findProductBySlug,
};
