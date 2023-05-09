import { Router } from "express";
import { CartManager } from "../manager/cart.manager.js";

const router = Router()
const cart = new CartManager("/cart.json")
cart.createFileCart()

router.post('/', async(req, res) =>{
    try {
        await cart.createCart()
        res.status(200).send({ status: "Success", message: "Carrito creado con éxito!" })
    } catch (error) {
        res.status(404).json({message:error.message})
    }
});

router.get('/:cid', async(req, res) =>{
    try {
        const {cid} = req.params
        const cartById = await cart.getCartById(parseFloat(cid))
        if(!cartById){
            return res.status(404).json({message:'Cart not found'})
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
        res.status(201).send({mensaje: "Producto agregado con éxito!"}); 
    } catch (error) {
        console.log(error)
        return res.status(202).send({ status: "ERROR", error: error })
    }
});

export default router
