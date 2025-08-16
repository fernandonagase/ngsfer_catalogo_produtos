const Product = require("../models/product.js");

const {
  getAllProducts: doGetAllProducts,
  findProductById: doFindProductById,
  getAllProductsV2: doGetAllProductsV2,
  findProductBySlug: doFindProductBySlug,
} = require("../services/prisma/product-service.js");

async function getAllProducts({ include, page, pageSize } = {}) {
  const products = await doGetAllProducts({ include, page, pageSize });
  return products.map((product) => Product.fromApiObject(product));
}

async function getAllProductsV2({ include, page, pageSize, searchText, orderBy } = {}) {
  const { data, pageCount } = await doGetAllProductsV2({ include, page, pageSize, searchText, orderBy });
  return {
    products: data.map((product) => Product.fromApiObject(product)),
    pageCount,
  };
}

async function findProductById(id, { include } = {}) {
  const product = await doFindProductById(id, { include });
  return product ? Product.fromApiObject(product) : null;
}

async function findProductBySlug(slug, { include } = {}) {
  const product = await doFindProductBySlug(slug, { include });
  return product ? Product.fromApiObject(product) : null;
}

module.exports = { getAllProducts, getAllProductsV2, findProductById, findProductBySlug };
