const express = require("express");
const ProductRouter = require("./product");
const swaggerUI = require("swagger-ui-express");
const docs = require("../../docs");

const ApiRouter = express.Router();

ApiRouter.use("/api/product", ProductRouter);
ApiRouter.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));

module.exports = ApiRouter;
