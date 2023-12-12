const product1 = {
  id: 1,
  name: "product1",
  description: "description of product1",
};

const getProduct = () => {
  return { id: 2, name: "product2", description: "description of product2" };
};

module.exports = { product1, getProduct };
