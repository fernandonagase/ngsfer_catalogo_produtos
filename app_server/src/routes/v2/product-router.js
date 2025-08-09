const logger = require("../../infra/logger.js");

const express = require("express");
const router = express.Router();

const {
  getAllProductsV2,
} = require("../../repositories/product-repository.js");
const { toProductResource } = require("../../resources/product-resource.js");
const { parseQueryArray } = require("../../helpers/routing.js");

/**
 * @swagger
 *
 * /api/v2/produtos:
 *   get:
 *     tags:
 *       - Produtos
 *     parameters:
 *       - name: include
 *         in: query
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         schema:
 *           type: integer
 *           default: 15
 *     responses:
 *       200:
 *         description: Lista de todos os produtos cadastrados no catálogo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       slug:
 *                         type: string
 *                       nome:
 *                         type: string
 *                       preco:
 *                         type: integer
 *                       descricao:
 *                         type: string
 *                       marca:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           slug:
 *                             type: string
 *                           nome:
 *                             type: string
 *                       categorias:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             slug:
 *                               type: string
 *                             nome:
 *                               type: string
 *                 pageCount:
 *                   type: integer
 */
router.get("/", async (req, res) => {
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
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 15
    });
    res.json({
        data: products.map((product) => toProductResource(product, { include })),
        pageCount,
    });
  } catch (error) {
    logger.logError(error);
    res.status(500).end();
  }
});

module.exports = router;
