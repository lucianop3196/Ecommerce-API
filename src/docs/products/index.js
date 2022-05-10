const getProducts = require("./get-products.js");
const getRandomProduct = require("./getRandomProduct.js")

module.exports = {
  paths: {
    "/api/product": {
      ...getProducts,
    },
    "/api/product/random": {
      ...getRandomProduct,
    },
  },
};
