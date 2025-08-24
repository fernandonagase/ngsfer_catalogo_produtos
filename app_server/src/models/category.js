class Category {
  id;
  slug;
  name;
  imagemUrl;

  constructor(id, slug, name, imagemUrl) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.imagemUrl = imagemUrl;
  }

  static fromApiObject(apiObject) {
    return new Category(
      apiObject.id,
      apiObject.slug,
      apiObject.nome,
      apiObject.imagemUrl
    );
  }
}

module.exports = Category;
