const express = require("express");
const router = express.Router();

const productRouterV1 = require("./v1/product-router.js");
router.use("/v1/produtos", productRouterV1);

const swaggerUi = require("swagger-ui-express");
const swaggerJsDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Catálogo de produtos",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de desenvolvimento",
      },
    ],
    tags: [
      {
        name: "Produtos",
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};
const swaggerJsdoc = require("swagger-jsdoc");
router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerJsDocOptions))
);

module.exports = router;
