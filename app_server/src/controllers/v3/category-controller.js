const logger = require("../../infra/logger.js");
const { toCategoryResource } = require("../../resources/category-resource.js");
const {
  getAllCategories,
  findCategoryBySlug: doFindCategoryBySlug,
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

async function findCategoryBySlug(req, res) {
  const category = await doFindCategoryBySlug(req.params.slug);
  if (category) {
    res.json(toCategoryResource(category));
  } else {
    res.status(404).json({ message: "Categoria não encontrada" });
  }
}

module.exports = {
  findAllCategories,
  findCategoryBySlug,
};
