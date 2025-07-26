const express = require('express');
const cors = require('cors');
const app = express();


// Configurar CORS
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});