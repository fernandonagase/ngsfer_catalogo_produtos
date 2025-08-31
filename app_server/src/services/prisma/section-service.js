const prisma = require("../../infra/prisma");

function getAllSections() {
  return prisma.secao.findMany({
    include: {
      produtos: true,
    },
  });
}

function getActiveSections() {
  return prisma.secao.findMany({
    where: {
      ativo: true,
    },
    include: {
      produtos: true,
    },
  });
}

module.exports = {
  getAllSections,
  getActiveSections,
};
