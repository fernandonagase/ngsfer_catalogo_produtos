const Brand = require("./brand");

class Product {
  id;
  slug;
  nome;
  preco;
  descricao;
  marca;

  constructor(id, slug, nome, preco, descricao, marca) {
    this.id = id;
    this.slug = slug;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.marca = marca ? new Brand(marca.id, marca.slug, marca.name) : null;
  }

  static fromApiObject(apiObject) {
    const brand = apiObject.marca
      ? {
          id: apiObject.marca.id,
          slug: apiObject.marca.slug,
          name: apiObject.marca.nome,
        }
      : null;
    return new Product(
      apiObject.id,
      apiObject.slug,
      apiObject.nome,
      apiObject.preco,
      apiObject.descricao,
      brand
    );
  }
}

module.exports = Product;
