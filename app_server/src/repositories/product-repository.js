const Product = require("../models/product.js");

const {
  getAllProducts: doGetAllProducts,
  findProductById: doFindProductById,
} = require("../services/prisma/product-service.js");

async function getAllProducts({ include, page, pageSize } = {}) {
  const products = await doGetAllProducts({ include, page, pageSize });
  return products.map((product) => Product.fromApiObject(product));
}

async function findProductById(id, { include } = {}) {
  const product = await doFindProductById(id, { include });
  return product ? Product.fromApiObject(product) : null;
}

module.exports = { getAllProducts, findProductById };
