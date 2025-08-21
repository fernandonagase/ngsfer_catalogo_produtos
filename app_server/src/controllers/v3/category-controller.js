const logger = require("../../infra/logger.js");
const { toCategoryResource } = require("../../resources/category-resource.js");
const {
  getAllCategories,
} = require("../../repositories/category-repository.js");

async function findAllCategories(req, res) {
  try {
    const { categories, pageCount } = await getAllCategories({
      featured: req.query.destaque,
    });
    res.json({
      data: categories.map((category) => toCategoryResource(category)),
      pageCount,
    });
  } catch (error) {
    logger.logError(error);
    res.status(500).end();
  }
}

module.exports = {
  findAllCategories,
};
