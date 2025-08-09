const logger = require("../../infra/logger.js");

const express = require("express");
const router = express.Router();

function parseQueryArray(param, { delimiter = "," } = {}) {
  if (!param) return [];
  if (Array.isArray(param)) return param;
  return param.split(delimiter).map((item) => item.trim());
}

const {
  getAllProducts,
  findProductById,
} = require("../../repositories/product-repository.js");
const { toProductResource } = require("../../resources/product-resource.js");

/**
 * @swagger
 *
 * /api/v1/produtos:
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   slug:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   preco:
 *                     type: integer
 *                   descricao:
 *                     type: string
 *                   marca:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       slug:
 *                         type: string
 *                       nome:
 *                         type: string
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         slug:
 *                           type: string
 *                         nome:
 *                           type: string
 */
router.get("/", async (req, res) => {
  try {
    const include = Object.fromEntries(
      parseQueryArray(req.query.include).map((relationship) => [
        relationship,
        true,
      ])
    );
    const products = await getAllProducts({
      include,
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 15
    });
    res.json(
      products.map((product) => toProductResource(product, { include }))
    );
  } catch (error) {
    logger.logError(error);
    res.status(500).end();
  }
});

/**
 * @swagger
 *
 * /api/v1/produtos/{id}:
 *   get:
 *     tags:
 *       - Produtos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: include
 *         in: query
 *         schema:
 *           type: string
 *         description: Relacionamentos de produto a serem carregados
 *     responses:
 *       200:
 *         description: Produto com o id solicitado
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   title: Produto básico
 *                   properties:
 *                     id:
 *                       type: integer
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
 *                     id:
 *                       type: integer
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
 *         description: Não foi encontrado produto com o id solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Produto não encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const include = Object.fromEntries(
      parseQueryArray(req.query.include).map((relationship) => [
        relationship,
        true,
      ])
    );
    const product = await findProductById(parseInt(req.params.id, 10), {
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
