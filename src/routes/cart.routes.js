import { Router } from "express";
import { CartManager } from "../api/carts/cart.manager.js";

const router = Router();
const cart = new CartManager("/cart.json");

router.post('/', async(req, res) =>{
    try {
        await cart.createCart()
        res.status(200).send({ status: 'Success', message: 'Cart created successfully!' })
    } catch (error) {
        res.status(404).json({message:error.message})
    }
});

router.get('/:cid', async(req, res) =>{
    try {
        const {cid} = req.params
        const cartById = await cart.getCartById(parseFloat(cid))
        if(!cartById){
            return res.status(404).json({message: 'Cart not found'})
        }
        return res.status(200).json(cartById)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
});

router.post('/:cid/product/:pid', async(req, res) =>{
    try {
        const {cid, pid} = req.params
        await cart.addProductCart(parseFloat(cid), parseFloat(pid))
        res.status(201).send({mensaje: "Product added successfully!"}); 
    } catch (error) {
        console.log(error)
        return res.status(202).send({ status: "ERROR", error: error })
    }
});

export default router
