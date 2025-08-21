function toCategoryResource(category) {
  return {
    slug: category.slug,
    nome: category.name,
  };
}

module.exports = { toCategoryResource };
