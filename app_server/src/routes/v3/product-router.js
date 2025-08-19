const express = require("express");
const router = express.Router();

const {
  findAllProducts,
  findProductBySlug,
} = require("../../controllers/v3/product-controller.js");

/**
 * @swagger
 *
 * /api/v3/produtos:
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
router.get("/", findAllProducts);

/**
 * @swagger
 *
 * /api/v3/produtos/{slug}:
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
router.get("/:slug", findProductBySlug);

module.exports = router;
