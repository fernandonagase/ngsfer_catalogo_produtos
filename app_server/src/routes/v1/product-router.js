const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../../repositories/product-repository.js");
const products = getAllProducts();

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
router.get("/", (req, res) => {
  res.json(products);
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
router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

module.exports = router;
