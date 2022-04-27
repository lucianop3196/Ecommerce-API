module.exports = {
  Products: {
    type: "array",
    items: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Product type",
          example: "chocolate",
        },
        price: {
          type: "integer",
          description: "Product price",
          example: 350,
        },
        quantity: {
          type: "integer",
          description: "Product quantity",
          example: 3,
        },
        id: {
          type: "integer",
          description: "Product unique id",
          example: 1,
        },
      },
    },
  },
  Product: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Product type",
        example: "chocolate",
      },
      price: {
        type: "integer",
        description: "Product price",
        example: 350,
      },
      quantity: {
        type: "integer",
        description: "Product quantity",
        example: 3,
      },
      id: {
        type: "integer",
        description: "Product unique id",
        example: 1,
      },
    },
  },
};
