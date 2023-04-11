class ProductManager{
    
    constructor(){
        this.products = [];
        this.idCounter = 0;
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const existingCode = this.products.find(product => product.code === code); 

        if(existingCode){
            console.log(`Ya existe un producto con el código ${code}`);
        } else {

            const product = {
                id: ++this.idCounter,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            
            return this.products.push(product);
        }
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
productManager.addProduct('produto prueba', 'Este es un producto prueba', 200, 'Sin Imagen', 'ABC123', 25);

// Se muestran los productos 
console.log(productManager.getProducts());

// Se agrega un nuevo producto , si se agrega un producto con el mismo CODE muestra un error
productManager.addProduct('produto prueba 2', 'Este es un producto prueba', 250, 'Sin Imagen', 'ABC124', 25);

// Se muestran los productos 
console.log(productManager.getProducts());

// Se obtiene producto por ID
console.log(productManager.getProductById(2)); // Si se prueba con otro ID que no este listado , se obtiene un error