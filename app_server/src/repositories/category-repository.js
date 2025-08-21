const Category = require("../models/category.js");

const {
  getAllCategories: doGetAllCategories,
} = require("../services/prisma/category-service.js");

async function getAllCategories({ featured = false } = {}) {
  const { data, pageCount } = await doGetAllCategories({ featured });
  return {
    categories: data.map((category) => Category.fromApiObject(category)),
    pageCount,
  };
}

module.exports = {
  getAllCategories,
};
