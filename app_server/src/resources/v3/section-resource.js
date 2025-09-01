const { toProductResource } = require("../v2/product-resource");

function toSectionResource(section) {
  return {
    id: section.id,
    nome: section.name,
    tipo: section.type,
    ativo: section.active,
    ordem: section.order,
    produtos: section.products.map((product) =>
      toProductResource(product, { include: { marca: true } })
    ),
  };
}

module.exports = { toSectionResource };
