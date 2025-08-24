const Category = require("../models/category.js");

const {
  getAllCategories: doGetAllCategories,
  findCategoryBySlug: doFindCategoryBySlug,
} = require("../services/prisma/category-service.js");

async function getAllCategories({ featured = false } = {}) {
  const { data, pageCount } = await doGetAllCategories({ featured });
  return {
    categories: data.map((category) => Category.fromApiObject(category)),
    pageCount,
  };
}

async function findCategoryBySlug(slug) {
  const category = await doFindCategoryBySlug(slug);
  return category ? Category.fromApiObject(category) : null;
}

module.exports = {
  getAllCategories,
  findCategoryBySlug,
};
