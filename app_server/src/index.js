const express = require("express");
const cors = require("cors");
const app = express();

// Configurar CORS
app.use(cors());

const PORT = process.env.PORT || 3001;

// #region Rotas antigas de produto
const { getAllProducts } = require("./repositories/product-repository.js");
const products = getAllProducts();

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});
// #endregion

const apiRouter = require("./routes/api-router.js");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Documentação da API em /api/docs`);
});
