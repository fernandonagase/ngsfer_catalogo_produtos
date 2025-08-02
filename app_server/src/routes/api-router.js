const express = require("express");
const router = express.Router();

const productRouterV1 = require("./v1/product-router.js");
router.use("/v1/produtos", productRouterV1);

module.exports = router;
