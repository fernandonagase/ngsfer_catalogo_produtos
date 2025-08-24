const prisma = require("../../infra/prisma");

async function getAllCategories({ featured = false } = {}) {
  const options = {};
  if (featured) {
    options.take = 12;
  }
  const [categories, totalCount] = await prisma.$transaction([
    prisma.Categoria.findMany(options),
    prisma.Categoria.count(),
  ]);
  return {
    data: categories,
    pageCount: Math.ceil(totalCount / 12),
  };
}

async function findCategoryBySlug(slug) {
  return prisma.Categoria.findUnique({ where: { slug } });
}

module.exports = { getAllCategories, findCategoryBySlug };
