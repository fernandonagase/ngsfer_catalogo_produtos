class Product {
  id;
  slug;
  nome;
  preco;
  descricao;

  constructor(id, slug, nome, preco, descricao) {
    this.id = id;
    this.slug = slug;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
  }

  static fromApiObject(apiObject) {
    return new Product(
      apiObject.id,
      apiObject.slug,
      apiObject.nome,
      apiObject.preco,
      apiObject.descricao
    );
  }
}

module.exports = Product;
