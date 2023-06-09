import { CartsModel } from "./models/carts.model.js";
import { ProductsModel } from "./models/products.model.js";

export default class CartsDaoMongo {
    
  async getAllCart() {
    try {
      const response = await CartsModel.find({});
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
      const response = await CartsModel.findById(cid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
        const findCart = await CartsModel.findById(cid);
        const allProducts = await ProductsModel.find();
        const findProduct = allProducts.find((prod) => prod.id === pid);

        if (!findProduct) {
        throw new Error(`¡The requested product id ${pid} does not exist!`);
      } else {
          if (findCart) {
            const productExist = findCart.product.find((product) => product.product === pid);
            if (!productExist) {
              const newProd = {
                quantity: 1,
                product: pid,
              };
              findCart.product.push(newProd);
              await CartsModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
              return findCart;
            }else {
              const indexProduct = findCart.product.findIndex(elemento => elemento.product === pid);
              findCart.product[indexProduct].quantity += 1;
              await CartsModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
              return findCart;
            }
          } else {
            throw new Error("The cart you are searching for does not exist!");
          }
      }
    } catch (error) {
        console.log(error);
    }
  }
}