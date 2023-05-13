import { Router } from "express";
import { ProductManager } from "../api/products/product.manager.js";
import { productValidator } from "../middlewares/productValidator.js";

const router = Router();
const productManager = new ProductManager("/products.json")

router.get('/', async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (limit) { //Limite de productos pasados por Query
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(Number(id));
    if (product) {
      res.status(200).json({ message: 'Product found', product })
    } else {
      res.status(400).send('Product not found')
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', productValidator, async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, code, price, stock, category, thumbnail } = req.body;
    const product = {
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnail,
    }
    const products = await productManager.getProducts();
    const existingCode = products.find((product) => product.code === code);
    /* const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category']; */

    if (existingCode) {
      console.log(`Product with code ${code} already exists`);
      res.status(400).send(`Product with code ${code} already exists`);
    } /* if (!requiredFields.every((field) => field in req.body)) {
      //Validacion de campos de product
      res.status(400).json({ message: 'Missing Required Fields' });
    } */ else {
      await productManager.addProduct(product);
      res.status(201).json({ message: 'Product added', product });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = req.body;
    const { id } = req.params;
    const productFile = await productManager.getProductById(Number(id));
    if (productFile) {
      await productManager.updateProduct(product, Number(id));
      res.send(`Product updated successfully!`);
    } else {
      res.status(404).send('Product not found')
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productManager.getProducts();
    const existingCode = products.find((product) => product.id === Number(id));
    if (existingCode) {
      await productManager.deleteProduct(Number(id));
      res.send(`Product id: ${id} deleted successfully`);
    } else {
      res.send(`Product id: ${id} not found`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete('/', async(req, res)=>{
  try {
      await productManager.deleteAllProducts();
      res.send('products deleted successfully')
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

export default router;