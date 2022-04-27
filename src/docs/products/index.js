const getProducts = require("./get-products.js");
const getRandomProduct = require("./getRandomProduct.js")

module.exports = {
  paths: {
    "/product": {
      ...getProducts,
    },
    "/product/random": {
      ...getRandomProduct,
    },
  },
};
