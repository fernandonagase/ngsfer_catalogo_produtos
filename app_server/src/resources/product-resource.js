function toProductResource(product) {
  return {
    id: product.id,
    slug: product.slug,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
  };
}

module.exports = { toProductResource };
