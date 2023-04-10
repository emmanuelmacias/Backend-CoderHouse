class ProductManager{
    
    constructor(){
        this.products = [];
        this.idCounter = 0;
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, stock) {
        const product = {
            id: ++this.idCounter,
            title,
            description,
            price,
            thumbnail,
            stock,
        };
        return this.products.push(product);
    }

    #existingProduct(idProduct) {
        return this.products.find(products => products.id === idProduct);
    }
    
    getProductById(idProduct) {
        const product = this.#existingProduct(idProduct);
        if (!product){
            console.log('Not found');
        } 
        return product; 
    }
}

// Se crea la instancia de ProductManager
const productManager = new ProductManager();

// Se obtienen los productos devuelve un Array vacío
console.log(productManager.getProducts());

// Se agrega un producto
productManager.addProduct('produto prueba', 'Este es un producto prueba', 200, 'Sin Imagen', 25);

// El producto se incluye
console.log(productManager.getProducts());

// Se obtiene producto por ID
console.log(productManager.getProductById(1)); // Si se prueba con otro ID , se obtiene un error


