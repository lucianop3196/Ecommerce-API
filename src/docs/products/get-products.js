module.exports = {
  get: {
    tags: ["Product get operation"],
    description: "Get products",
    operationId: "getProducts",
    parameters: [],
    responses: {
      200: {
        description: "Products were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Products",
            },
          },
        },
      },
      400: {
        description: "Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
            example: {
              message: "Ha ocurrido un error, por favor vuelta a intentarlo",
            },
          },
        },
      },
    },
  },
};
