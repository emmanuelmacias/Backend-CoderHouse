import { CartsModel } from "./models/carts.model.js";
import { ProductsModel } from "./models/products.model.js";

export default class CartsDaoMongo {
    
  async getAllCart() {
    try {
      const response = await CartsModel.find({}).populate('products.product').exec();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      const response = await CartsModel.findById(cid).populate('products.product').exec();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const findCart = await CartsModel.findById(cid);
      const findProduct = await ProductsModel.findById(pid);

      if (!findProduct) {
        throw new Error(`The requested product id ${pid} does not exist!`);
      } else {
        if (findCart) {
          const productExist = findCart.products.find(
            (product) => product.product.toString() === pid
          );
          if (!productExist) {
            const newProd = {
              quantity: 1,
              product: findProduct._id,
            };
            findCart.products.push(newProd);
          } else {
            const indexProduct = findCart.products.findIndex(
              (elemento) => elemento.product.toString() === pid
            );
            findCart.products[indexProduct].quantity += 1;
          }
          await findCart.save();
          return findCart;
        } else {
          throw new Error("The cart you are searching for does not exist!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await CartsModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }
 
      const productToUpdate = cart.products.find(
        (product) => product.product.toString() === pid
      );
      if (!productToUpdate) {
        throw new Error("Product not found in cart");
      }
 
      productToUpdate.quantity = quantity;
      await cart.save();
 
      return cart;
    } catch (error) {
      console.log(error);
    }
   }
 
   async deleteProductFromCart(cid, pid) {
    try {
      const findCart = await CartsModel.findById(cid);

      if (findCart) {
        const productIndex = findCart.products.findIndex(
          (product) => product.product.toString() === pid
        );
        if (productIndex !== -1) {
          findCart.products.splice(productIndex, 1);
          await findCart.save();
          return findCart;
        } else {
          throw new Error(
            "The product you are searching for does not exist in the cart!"
          );
        }
      } else {
        throw new Error("The cart you are searching for does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
 
   async deleteAllProductCart(cid) {
     try {
       const findCart = await CartsModel.findById(cid);
       if (findCart) {
         findCart.products = [];
         await findCart.save();
         return findCart;
       } else {
         throw new Error("The cart you are searching for does not exist!");
       }
     } catch (error) {
       console.log(error);
     }
   }
 
}



