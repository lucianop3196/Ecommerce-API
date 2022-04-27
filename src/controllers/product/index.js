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
        return object.id;
      }
      i++;
      object.id = i;
      if (i === 1) {
        await fs.promises.writeFile(fileName, `[${JSON.stringify(object)}]`);
        return;
      }
      await addObjectToFile(fileName, object);
      return this.id;
    } catch (error) {
      console.log(error);
    }
  }

  static async getById(id, fileName) {
    try {
      const object = await getObjById(fileName, id);
      if (typeof object === "undefined") return null;
      console.log(`getById id: ${id} ---> `, object);
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll(fileName) {
    try {
      const file = await getEntireFile(fileName);
      if (!file) {
        console.log("getAll ---> ", []);
        return [];
      }
      console.log("getAll ---> ", file);
      return file;
    } catch (error) {
      console.log(error);
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
      console.log("all file are deleted");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductController;
