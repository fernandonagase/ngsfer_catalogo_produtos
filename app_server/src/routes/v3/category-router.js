const express = require("express");
const router = express.Router();

const {
  findAllCategories,
  findCategoryBySlug,
} = require("../../controllers/v3/category-controller.js");

/**
 * @swagger
 *
 * /api/v3/categorias:
 *  get:
 *    tags:
 *      - Categorias
 *    parameters:
 *      - name: destaque
 *        in: query
 *        schema:
 *          type: boolean
 *        description: Traz apenas algumas categorias em destaque
 *        required: false
 *        example: false
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      slug:
 *                        type: string
 *                      nome:
 *                        type: string
 *                      imagemUrl:
 *                        type: string
 *                pageCount:
 *                  type: integer
 */
router.get("/", findAllCategories);

/**
 * @swagger
 *
 * /api/v3/categorias/{slug}:
 *  get:
 *    tags:
 *      - Categorias
 *    parameters:
 *      - name: slug
 *        in: path
 *        required: true
 *    responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slug:
 *                   type: string
 *                   example: "eletronicos"
 *                 nome:
 *                   type: string
 *                   example: "Eletrônicos"
 *                 imagemUrl:
 *                   type: string
 *                   nullable: true
 *                   example: "https://example.com/image.jpg"
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categoria não encontrada"
 */
router.get("/:slug", findCategoryBySlug);

module.exports = router;
