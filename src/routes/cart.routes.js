import { Router } from "express";
import {
  getCartsController,
  getCartByIdController,
  createCartController,
  addProductToCartController,
  updateProductQuantityController,
  deleteAllProductCartController,
  deleteProductFromCartController
} from "../controllers/carts.controllers.js";

const router = Router();

router.get("/", getCartsController);
router.get("/:cid", getCartByIdController);
router.post("/", createCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.put("/:cid/product/:pid", updateProductQuantityController );
router.delete("/:cid", deleteAllProductCartController);
router.delete("/:cid/product/:pid", deleteProductFromCartController);


export default router;
