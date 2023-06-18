# BACKEND | CODERHOUSE 2023

Repositorio de entregas de los desafios para el curso de Backend 2023 de CODERHOUSE

## Instalación

1. Clona este repositorio: `git clone https://github.com/emmanuelmacias/Backend-CoderHouse`
2. Navega hasta el directorio del proyecto: `cd Backend-CoderHouse`
3. Instala las dependencias: `npm install express mongoose mongoose-paginate-v2`

## Uso

1. Ejecuta la aplicación: `npm start`

## Rutas

CART

GET carts || `http://localhost:8080/carts` 

Hay creada dos Carts:

1. 648e831c7431ead091eb3fa6
2. 648e83557431ead091eb3fa8

GET cart by id || `http://localhost:8080/cart/648e831c7431ead091eb3fa6`

POST product to cart || `http://localhost:8080/carts/648e831c7431ead091eb3fa6/product/647caac0f8cd13b1f15227dd`

DELETE cart || `http://localhost:8080/carts/648e831c7431ead091eb3fa6`

DELETE product from cart || `http://localhost:8080/carts/648e831c7431ead091eb3fa6/product/647caac0f8cd13b1f15227dd`

PUT quantity from product in cart || `http://localhost:8080/carts/648e831c7431ead091eb3fa6/product/647caac0f8cd13b1f15227dd`

Se actualiza la cantidad a través del {Body} en formato JSON, EJEMPLO:

{
    "quantity": 5
}


|******************************|

PRODUCTS

GET products || `http://localhost:8080/products`

GET product by ID || `http://localhost:8080/products/648a874963e84c58eb8a64c6`

POST Product || `http://localhost:8080/products` 

Copie y Pegue el JSON en el cuerpo del {Body} 

{
  "title": "Producto 20",
  "description": "Descripción 20",
  "code": 460,
  "price": 2500,
  "stock": 30,
  "category": "Categoría 20",
  "thumbnail": "imagen"
}

PUT product || `http://localhost:8080/products/648a874963e84c58eb8a64c6`

Actualice el campo que quiera, EJEMPLO:

{
  "price": 300
}

DELETE product || `http://localhost:8080/products/648a874963e84c58eb8a64c6`