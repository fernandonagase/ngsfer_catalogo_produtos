const Product = require("./product");

class Section {
  id;
  name;
  type;
  active;
  order;
  products;

  constructor(id, name, type, active, order, products = []) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.active = active;
    this.order = order;
    this.products = products.map(
      (product) =>
        new Product(
          product.id,
          product.slug,
          product.nome,
          product.preco,
          product.descricao,
          product.marca,
          product.categorias
        )
    );
  }

  static fromApiObject(apiObject) {
    const {
      id,
      nome: name,
      tipo: type,
      ativo: active,
      ordem: order,
      produtos: products,
    } = apiObject;

    return new Section(
      id,
      name,
      type,
      active,
      order,
      products.map((product) => Product.fromApiObject(product))
    );
  }
}

module.exports = Section;
