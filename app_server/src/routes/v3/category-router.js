const express = require("express");
const router = express.Router();

const {
  findAllCategories,
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

module.exports = router;
