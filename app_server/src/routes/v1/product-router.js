const logger = require("../../infra/logger.js");

const express = require("express");
const router = express.Router();

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
 *                   name:
 *                     type: string
 *                   price:
 *                     type: integer
 */
router.get("/", async (_, res) => {
  try {
    const products = await getAllProducts();
    res.json(products.map(toProductResource));
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
 *     responses:
 *       200:
 *         description: Produto com o id solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: integer
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
    const product = await findProductById(parseInt(req.params.id, 10));
    if (product) {
      res.json(toProductResource(product));
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    logger.logError(error);
    res.status(500).end();
  }
});

module.exports = router;
