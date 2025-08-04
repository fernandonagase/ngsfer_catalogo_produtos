const { toBrandResource } = require("./brand-resource");

function toProductResource(product, { include } = {}) {
  const resource = {
    id: product.id,
    slug: product.slug,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
  };
  if (include.marca) {
    resource.marca = product.marca ? toBrandResource(product.marca) : null;
  }
  return resource;
}

module.exports = { toProductResource };
