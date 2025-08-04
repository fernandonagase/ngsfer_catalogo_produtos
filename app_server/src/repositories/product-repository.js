const Product = require("../models/product.js");

const {
  getAllProducts: doGetAllProducts,
  findProductById: doFindProductById,
} = require("../services/prisma/product-service.js");

async function getAllProducts() {
  const products = await doGetAllProducts();
  return products.map((product) => Product.fromApiObject(product));
}

async function findProductById(id) {
  const product = await doFindProductById(id);
  return product ? Product.fromApiObject(product) : null;
}

module.exports = { getAllProducts, findProductById };
