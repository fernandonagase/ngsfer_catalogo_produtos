function toCategoryResource(category) {
  return {
    slug: category.slug,
    nome: category.name,
    imagemUrl: category.imagemUrl,
  };
}

module.exports = { toCategoryResource };
