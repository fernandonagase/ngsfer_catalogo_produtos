const Brand = require("./brand");
const Category = require("./category");
const ProductImage = require("./productImage");

class Product {
  id;
  slug;
  nome;
  preco;
  descricao;
  marca;
  categorias;
  images;

  constructor(
    id,
    slug,
    nome,
    preco,
    descricao,
    marca,
    categorias = [],
    images = []
  ) {
    this.id = id;
    this.slug = slug;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.marca = marca ? new Brand(marca.id, marca.slug, marca.name) : null;
    this.categorias = categorias.map(
      (categoria) => new Category(categoria.id, categoria.slug, categoria.name)
    );
    this.images = images;
  }

  static fromApiObject(apiObject) {
    const brand = apiObject.marca
      ? {
          id: apiObject.marca.id,
          slug: apiObject.marca.slug,
          name: apiObject.marca.nome,
        }
      : null;
    const categories = apiObject.categorias
      ? apiObject.categorias.map((categoria) => ({
          id: categoria.id,
          slug: categoria.slug,
          name: categoria.nome,
        }))
      : [];
    const images = apiObject.ProdutoImagem
      ? apiObject.ProdutoImagem.map((imagem) =>
          ProductImage.fromApiObject(imagem)
        )
      : [];
    return new Product(
      apiObject.id,
      apiObject.slug,
      apiObject.nome,
      apiObject.preco,
      apiObject.descricao,
      brand,
      categories,
      images
    );
  }
}

module.exports = Product;
