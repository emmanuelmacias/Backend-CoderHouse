import express from 'express';
import ProductManager from './manager/product.manager.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager('../products.json');

app.get('/products', async(req, res) => {
  try {
      const products = await productManager.getProducts();
      res.status(200).json(products);
  } catch (error) {
      res.status(404).json({ message: error.message });
      console.log(error);
  }
});

app.get('/products/:id', async(req, res) => {
  try {
      const { id } = req.params;
      const product = await productManager.getProductById(Number(id));
      if(product){
          res.status(200).json({ message: 'Product found', product })
      } else {
          res.status(400).send('product not found')
      }
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

/* 
app.get('/products', async(req, res) => {
  try {
      const { id } = req.query;
      const product = await productManager.getProductById(Number(id));
      if(product){
          res.status(200).json({ message: 'Product found', product })
      } else {
          res.status(400).send('product not found')
      }
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}); */


app.post('/products', async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, price, thumbnail, code, stock } = req.body;
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }
    const products = await productManager.getProducts();
    const existingCode = products.find((product) => product.code === code);

    if (existingCode) {
      console.log(`Product with code ${code} already exists`);
      res.status(400).send(`Product with code ${code} already exists`);
    } else {
      await productManager.addProduct(product);
      res.status(201).json({ message: 'Product added', product });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

app.put('/products/:id', async(req, res) => {
  try {
      const product = req.body;
      const { id } = req.params;
      const productFile = await productManager.getProductById(Number(id));
      if(productFile){
          await productManager.updateProduct(product, Number(id));
          res.send(`product updated successfully!`);
      } else {
          res.status(404).send('product not found')
      }
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

app.delete('/products/:id', async(req, res)=>{
  try {
      const { id } = req.params;
      const products = await productManager.getProducts();
      if(products.length > 0){
          await productManager.deleteProduct(Number(id));
          res.send(`product id: ${id} deleted successfully`);
      } else {
          res.send(`product id: ${id} not found`);
      }
  } catch (error) {
      res.status(404).json({ message: error.message });

  }
});

app.delete('/products', async(req, res)=>{
  try {
      await productManager.deleteAllProducts();
      res.send('products deleted successfully')
  } catch (error) {
      res.status(404).json({ message: error.message });

  }
});

app.listen(PORT, () => {
    console.log(`Server run OK in port: ${PORT}`);
  });