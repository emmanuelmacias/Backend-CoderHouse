const fs = require('fs');

class ProductManager {
  constructor() {
    this.idCounter = 0;
    this.path = "./products.json";
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf8');
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const productsFile = await this.getProducts();
      const existingCode = productsFile.find(
        (product) => product.code === code
      );

      if (existingCode) {
        console.log(`Ya existe un producto con el código ${code}`);
      } else {
        const lastProduct = productsFile[productsFile.length - 1];
        const newId = lastProduct ? lastProduct.id + 1 : 1;
        const product = {
          id: newId,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        productsFile.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(idProduct) {
    try {
      const productsFile = await this.getProducts();
      const productIndex = productsFile.findIndex((product) => product.id === idProduct);
  
      if (productIndex === -1) {
        console.log('No se encontró el producto con el ID especificado');
      } else {
        productsFile.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        console.log(`Producto con ID ${idProduct} eliminado exitosamente`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(idProduct, updatedFields) {
    try {
      const productsFile = await this.getProducts();
      const productIndex = productsFile.findIndex((product) => product.id === idProduct);
  
      if (productIndex === -1) {
        console.log('No se encontró el producto con el ID especificado');
      } else {
        const updatedProduct = {
          ...productsFile[productIndex],
          ...updatedFields,
          id: idProduct, // aseguramos que no se cambie el ID original
        };
        productsFile[productIndex] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        console.log(`Producto actualizado exitosamente`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #existingProduct(idProduct) {
    try {
      const productsFile = await this.getProducts();
      return productsFile.find((products) => products.id === idProduct);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(idProduct) {
    try {
      const product = this.#existingProduct(idProduct);
      if (!product) {
        console.log('Not found');
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Se crea la instancia de ProductManager
const productManager = new ProductManager();

// Se obtienen los productos devuelve un Array vacío
const test = async () => {
  const get1 = await productManager.getProducts();
  console.log("Consulta inicial: ", get1);
  // Se agrega un producto (si tiene el mismo Code arroja error y no se agrega al file)
  await productManager.addProduct(
    "produto prueba",
    "Este es un producto prueba",
    200,
    "Sin Imagen",
    "ABC123",
    25
  );
  // Consulta  de producto por ID
  const get2 = await productManager.getProductById(2);
  console.log("Consulta por ID: ", get2);
  // Consulta del Array de productos
  const get3 = await productManager.getProducts();
  console.log("Segunda consulta: ", get3);
  //Eliminar producto por ID
  await productManager.deleteProduct(1);
  const get4 = await productManager.getProducts();
  console.log("Tercer Consulta: ", get4);
  // Actualizar producto por ID (Precio y Stock)
  await productManager.updateProduct(2, { 
    price: 300,
    stock: 30,
  });
  // Consulta Final
  const get5 = await productManager.getProducts();
  console.log("Tercer Consulta: ", get5);

};

test();
