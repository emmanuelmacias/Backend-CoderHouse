import { Router } from "express";
import { ProductManager } from "../daos/filesystem/products.dao.js";

const router = Router();
const productManager = new ProductManager("/products.json")

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.log(error);
    }
});

//Ruta con WebSocket
router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
  });

export default router;