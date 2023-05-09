import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.dirName = "./src/files";
    this.fileName = this.dirName + path;
    this.fs = fs
    /* this.path = path; */
  }

  async createFile() {
    try {
      if (!fs.existsSync(this.fileName)) {
        await this.fs.promises.mkdir(this.dirName, { recursive: true });
        await this.fs.promises.writeFile(this.fileName, "[]");
      }
    } catch (error) {
      throw new Error(error); // se lanza un objeto Error
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const products = await this.getProducts();
    products.map((prod) => {
      if (prod.id > maxId) maxId = prod.id;
    });
    return maxId;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.fileName)) {
        const products = await fs.promises.readFile(this.fileName, "utf8");
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #existingProduct(id) {
    try {
      const productsFile = await this.getProducts();
      return productsFile.find((products) => products.id === id);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const product = this.#existingProduct(id);
      if (!product) {
        console.log("Not found");
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(obj) {
    const productsFile = await this.getProducts();
    try {
        const product = {
          id: await this.#getMaxId() + 1,
          ...obj
        };
        productsFile.push(product);
        await fs.promises.writeFile(this.fileName, JSON.stringify(productsFile));    
    } catch (error) {
      console.log(error);
    }
  }

/*   async createProduct(obj){
    try {
        const product = {
            id: await this.#getMaxId() + 1,
            ...obj
        };
        const productsFile = await this.getProducts();
        productsFile.push(product);
        await fs.promises.writeFile(this.fileName, JSON.stringify(productsFile));
        return product;
    } catch (error) {
        console.log(error);
    }
} */

  async updateProduct(id, updatedFields) {
    try {
      const productsFile = await this.getProducts();
      const productIndex = productsFile.findIndex(
        (product) => product.id === id
      );

      if (productIndex === -1) {
        console.log("The product with the specified ID was not found");
      } else {
        const updatedProduct = {
          ...productsFile[productIndex],
          ...updatedFields,
          id: id, // aseguramos que no se cambie el ID original
        };
        productsFile[productIndex] = updatedProduct;
        await fs.promises.writeFile(this.fileName, JSON.stringify(productsFile));
        console.log(`Product successfully upgraded`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productsFile = await this.getProducts();
      if (productsFile.length > 0) {
        const newArray = productsFile.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.fileName, JSON.stringify(newArray));
        console.log(`Product whith ${id} removed successfully`);
      } else {
        throw new Error(`Product with ID not found: ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProducts() {
    try {
      if (fs.existsSync(this.fileName)) {
        await fs.promises.unlink(this.fileName);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
