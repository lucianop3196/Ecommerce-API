const fs = require("fs");

async function getObjById(fileName, id) {
  const fileJSON = await fs.promises.readFile(fileName, "utf8");
  const file = JSON.parse(fileJSON); // para transofrmar lo que viene en objeto
  const object = file?.find((obj) => obj.id === id);
  return object; //retorna el objeto encontrado
}
async function deleteObjectById(fileName, id) {
  const fileJSON = await fs.promises.readFile(fileName, "utf8");
  const file = JSON.parse(fileJSON);
  fileModified = file?.filter((obj) => obj.id !== id);
  fileModifiedJSON = JSON.stringify(fileModified); //Sobreescribimos el archivo, pero antes lo pasamos a string
  await fs.promises.writeFile(fileName, fileModifiedJSON);
  return fileModified; //Retorna el objeto sin el elemento borrado
}
async function getEntireFile(fileName) {
  try {
    const fileJSON = await fs.promises.readFile(fileName, "utf8");
    const file = JSON.parse(fileJSON);
    return file;
  } catch (error) {
    console.log(error);
  }
}
async function addObjectToFile(fileName, object) {
  const file = await getEntireFile(fileName);
  file.push(object);
  file.sort((a, b) => {
    return a.id - b.id;
  });
  const fileJSON = JSON.stringify(file);
  await fs.promises.writeFile(fileName, fileJSON); //SobreEscribimos el archivo con el objeto agregado
}

let i = 0;

class ProductController {
  static async save(object, fileName) {
    try {
      if (Object.keys(object).includes("id")) {
        await deleteObjectById(fileName, object.id);
        await addObjectToFile(fileName, object);
        return { code: 201, productId: object.id };
      }
      i++;
      object.id = i;
      if (i === 1) {
        await fs.promises.writeFile(fileName, `[${JSON.stringify(object)}]`);
        return { code: 201, product: object };
      }
      await addObjectToFile(fileName, object);
      return { code: 201, product: object };
    } catch (error) {
      console.log(error);
      return { code: 400, error };
    }
  }

  static async getById(id, fileName) {
    try {
      const object = await getObjById(fileName, id);
      if (typeof object === "undefined")
        return { error: "Product not found", code: 400 };
      return { product: object, code: 200 };
    } catch (error) {
      console.log(error);
      return { code: 400, error };
    }
  }

  static async getAll(fileName) {
    try {
      const file = await getEntireFile(fileName);
      if (!file) {
        return { code: 200, products: [] };
      }
      return { code: 200, products: file };
    } catch (error) {
      console.log(error);
      return { code: 400, error };
    }
  }

  static async deleteById(id, fileName) {
    try {
      fileModified = await deleteObjectById(fileName, id);
      return console.log(
        `File after delete the object with id: ${id} --> `,
        fileModified
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAll(fileName) {
    try {
      await fs.promises.unlink(fileName);
      return { code: 200, message: "all file were deleted" };
    } catch (error) {
      console.log("Error ", error);
      return { code: 400, message: error };
    }
  }
}

module.exports = ProductController;
