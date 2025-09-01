const prisma = require("../../infra/prisma");

const loadProductsStrategies = {
  personalizado(sectionId) {
    return prisma.produto.findMany({
      where: {
        secoes: {
          some: {
            id: sectionId,
          },
        },
      },
      include: {
        marca: true,
      },
    });
  },
  novidade() {
    return prisma.produto.findMany({
      include: {
        marca: true,
      },
      orderBy: {
        criado_em: "desc",
      },
      take: 12,
    });
  },
  mais_vendidos() {
    return [];
  },
};

function getAllSections() {
  return prisma.secao.findMany({
    include: {
      produtos: true,
    },
  });
}

async function getActiveSections() {
  const sections = await prisma.secao.findMany({
    where: {
      ativo: true,
    },
  });
  for (const section of sections) {
    const loadProductsStrategy = loadProductsStrategies[section.tipo];
    section.produtos = await loadProductsStrategy(section.id);
  }
  return sections;
}

module.exports = {
  getAllSections,
  getActiveSections,
};
