const express = require("express");
const ProductController = require("../../controllers/product");

const ProductRouter = express.Router();

ProductRouter.get("", async (req, res) => {
  try {
    const products = await ProductController.getAll("productos.txt");
    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error: ", err);
  }
});

ProductRouter.get("/random", async (req, res) => {
  try {
    const products = await ProductController.getAll("productos.txt");
    const randomIndex = Math.floor(Math.random() * products.length);
    res.json(products[randomIndex]);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Ha ocurrido un error, por favor vuelta a intentarlo" });
  }
});

module.exports = ProductRouter;
