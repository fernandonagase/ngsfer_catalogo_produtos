const { toBrandResource } = require("../brand-resource");
const { toCategoryResource } = require("../category-resource");

function toProductResource(product, { include } = {}) {
  const resource = {
    slug: product.slug,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
  };
  if (include.marca) {
    resource.marca = product.marca ? toBrandResource(product.marca) : null;
  }
  if (include.categorias) {
    resource.categorias = product.categorias?.map(toCategoryResource) ?? [];
  }
  return resource;
}

module.exports = { toProductResource };
