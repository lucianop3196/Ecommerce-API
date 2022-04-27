module.exports = {
    get: {
        tags: ["Product get operation"],
        description: "Get a random product",
        operationId: "getRandomProduct",
        parameters: [],
        responses: {
          200: {
            description: "Product were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
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
  