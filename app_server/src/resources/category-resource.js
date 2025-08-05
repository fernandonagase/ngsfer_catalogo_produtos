function toCategoryResource(category) {
  return {
    id: category.id,
    slug: category.slug,
    nome: category.name,
  };
}

module.exports = { toCategoryResource };
