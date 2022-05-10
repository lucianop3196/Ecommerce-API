const express = require("express");
const ProductController = require("../../controllers/product");
const { validateFields } = require("../../util");
var path = require("path");

const ProductRouter = express.Router();

ProductRouter.get("/home", async (req, res) => {
  try {
    res.sendFile(path.resolve("./public/index.html"));
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error: ", err);
  }
});

ProductRouter.get("", async (req, res) => {
  try {
    const { code, ...message } = await ProductController.getAll(
      "productos.txt"
    );
    return res.status(code).json(message);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error: ", err);
  }
});

ProductRouter.get("/random", async (req, res) => {
  try {
    const { code, ...message } = await ProductController.getAll(
      "productos.txt"
    );
    console.log("message.products ", message.products);
    if (code === 400) return res.status(code).json(message);
    const randomIndex = Math.floor(Math.random() * message.products?.length);
    return res.status(code).json({ product: message.products[randomIndex] });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Something went wrong, please try again" });
  }
});

ProductRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || typeof parseInt(id) !== "number")
    return res.status(400).send({ message: "Invalid param" });
  try {
    const { code, ...message } = await ProductController.getById(
      parseInt(id),
      "productos.txt"
    );
    return res.status(code).json(message);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error: ", err);
  }
});

ProductRouter.post("", async (req, res) => {
  const fieldsRequired = ["title", "price", "quantity"];
  const missingFields = validateFields(req.body, fieldsRequired);
  if (!req || missingFields.length > 0)
    return res
      .status(400)
      .send({ message: `Missing fields: ${missingFields.join()}` });

  try {
    const { code, ...message } = await ProductController.save(
      req.body,
      "productos.txt"
    );
    res.status(code).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Something went wrong, please try again" });
  }
});

ProductRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!req || !id)
    return res.status(400).send({ message: "Missing params: id" });

  try {
    req.body.id = parseInt(id);
    const { code, ...message } = await ProductController.save(
      req.body,
      "productos.txt"
    );
    res.status(code).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ message: "Something went wrong, please try again" });
  }
});

ProductRouter.delete("", async (req, res) => {
  try {
    const { code, message } = await ProductController.deleteAll(
      "productos.txt"
    );
    return res.status(code).json(message);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error: ", err);
  }
});

module.exports = ProductRouter;
