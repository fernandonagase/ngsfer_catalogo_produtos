function toBrandResource(brand) {
  return {
    id: brand.id,
    slug: brand.slug,
    nome: brand.name,
  };
}

module.exports = { toBrandResource };
