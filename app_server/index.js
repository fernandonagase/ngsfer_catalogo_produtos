const express = require('express');
const cors = require('cors');
const app = express();


// Configurar CORS
app.use(cors());

const PORT = process.env.PORT || 3001;

const products = [
    { id: 1, name: 'Produto 1', price: 100 },
    { id: 2, name: 'Produto 2', price: 200 },
    { id: 3, name: 'Produto 3', price: 300 },
  ];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});