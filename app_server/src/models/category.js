class Category {
  id;
  slug;
  name;

  constructor(id, slug, name) {
    this.id = id;
    this.slug = slug;
    this.name = name;
  }

  static fromApiObject(apiObject) {
    return new Category(apiObject.id, apiObject.slug, apiObject.nome);
  }
}

module.exports = Category;
