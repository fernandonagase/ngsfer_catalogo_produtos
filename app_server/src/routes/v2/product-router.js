const logger = require("../../infra/logger.js");

const express = require("express");
const router = express.Router();

const {
  getAllProductsV2,
  findProductBySlug,
} = require("../../repositories/product-repository.js");
const { toProductResource } = require("../../resources/v2/product-resource.js");
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
 *       - name: search
 *         in: query
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
});

/**
 * @swagger
 *
 * /api/v1/produtos/{slug}:
 *   get:
 *     tags:
 *       - Produtos
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *       - name: include
 *         in: query
 *         schema:
 *           type: string
 *         description: Relacionamentos de produto a serem carregados
 *     responses:
 *       200:
 *         description: Produto com o slug solicitado
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   title: Produto básico
 *                   properties:
 *                     slug:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     preco:
 *                       type: integer
 *                     descricao:
 *                       type: string
 *                 - type: object
 *                   title: Produto com relacionamentos
 *                   properties:
 *                     slug:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     preco:
 *                       type: integer
 *                     descricao:
 *                       type: string
 *                     marca:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         slug:
 *                           type: string
 *                         nome:
 *                           type: string
 *                     categorias:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           slug:
 *                             type: string
 *                           nome:
 *                             type: string
 *       404:
 *         description: Não foi encontrado produto com o slug solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado
 */
router.get("/:slug", async (req, res) => {
  try {
    const include = Object.fromEntries(
      parseQueryArray(req.query.include).map((relationship) => [
        relationship,
        true,
      ])
    );
    const product = await findProductBySlug(req.params.slug, {
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
});

module.exports = router;
