const logger = require("../../infra/logger.js");

const { toProductResource } = require("../../resources/v2/product-resource.js");
const { parseQueryArray } = require("../../helpers/routing.js");
const {
  getAllProductsV2,
  findProductBySlug: doFindProductBySlug,
} = require("../../repositories/product-repository.js");

async function findAllProducts(req, res) {
  try {
    const include = Object.fromEntries(
      parseQueryArray(req.query.include).map((relationship) => [
        relationship,
        true,
      ])
    );
    const { products, pageCount } = await getAllProductsV2({
      include,
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 15,
      searchText: req.query.search,
      orderBy: req.query.sort,
    });
    res.json({
      data: products.map((product) => toProductResource(product, { include })),
      pageCount,
    });
  } catch (error) {
    logger.logError(error);
    res.status(500).end();
  }
}

async function findProductBySlug(req, res) {
  try {
    const include = Object.fromEntries(
      parseQueryArray(req.query.include).map((relationship) => [
        relationship,
        true,
      ])
    );
    const product = await doFindProductBySlug(req.params.slug, {
      include,
    });
    if (product) {
      res.json(toProductResource(product, { include }));
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).end();
  }
}

module.exports = { findAllProducts, findProductBySlug };
