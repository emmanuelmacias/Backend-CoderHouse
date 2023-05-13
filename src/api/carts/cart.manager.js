import fs from "fs"
import { ProductManager } from "../products/product.manager.js"

const productManager = new ProductManager("/products.json")

export class CartManager {
    constructor (path) {
        this.dirName = './src/files';
        this.fileName = this.dirName + path;
        this.fs = fs;         
    }

    async createFileCart() {
        try {
            if(!this.fs.existsSync(this.fileName)) {            
                await this.fs.promises.mkdir(this.dirName, {recursive: true})
                await this.fs.promises.writeFile(this.fileName, "[]")           
            }    
        } catch (error) {
            throw Error (error);
        }    
    }
    async createCart() {
        try {
            let cartGet = await this.getCarts()
            const lastProduct = cartGet[cartGet.length - 1];
            const newId = lastProduct ? lastProduct.id + 1 : 1;
            const cart = {
                id: newId,
                products: []
            } 
            cartGet.push(cart)
            await this.fs.promises.writeFile(this.fileName, JSON.stringify(cartGet, null, 2))
        } catch (error) {
            
        }
    }
    async getCarts() {
        try{
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")
            let readCartParse = JSON.parse(readCart) 
            return readCartParse
        } catch(error){
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            let cartGet = await this.getCarts()
            let findCartId = cartGet.find((cart => cart.id == id))
            if (findCartId) {                                                                             
                return findCartId
            } else {
                throw Error ("El id del cart recibido no coincide")
            }
        } catch (error) {
            console.log(error);
        }
    }
    async addProductCart(idCart, Idproduct){
        try {
            let cartGet = await this.getCarts()
            //obtener el carrito por id
            const searchCartById = cartGet.find((obj => obj.id == idCart))
            
            // obtener el id del producto
            let findProd = await productManager.getProductById(Idproduct)
            // fijarse si el producto ya esta en el carrito
            const newProductToCart = {
                quantity: 1,
                productID: findProd.id
            }
            const productInCartFind = await searchCartById.products.find((p => p.productID === findProd.id))
            if(productInCartFind){
                productInCartFind.quantity++
                return await fs.promises.writeFile(this.fileName, JSON.stringify(cartGet, null, 2))
            }
            searchCartById.products.push(newProductToCart)
            await fs.promises.writeFile(this.fileName, JSON.stringify(cartGet, null, 2))
            
        } catch (error) {
            console.log(error);
        }
    }

}