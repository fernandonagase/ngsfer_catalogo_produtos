const products = [
  { id: 1, name: "Produto 1", price: 100 },
  { id: 2, name: "Produto 2", price: 200 },
  { id: 3, name: "Produto 3", price: 300 },
];

function getAllProducts() {
  return [...products];
}

module.exports = { getAllProducts };
