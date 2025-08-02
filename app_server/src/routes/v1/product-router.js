const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../../repositories/product-repository.js");
const products = getAllProducts();

router.get("/", (req, res) => {
  res.json(products);
});

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
