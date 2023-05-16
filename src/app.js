import express from "express";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import productsRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import socketRouter from "./routes/socket.routes.js";
import { ProductManager } from "./api/products/product.manager.js";

const productManager = new ProductManager("/products.json");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

//Configuration HandleBars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Routes
app.use("/products", productsRouter);
app.use("/carts", cartRouter);
app.use("/", socketRouter);

/* app.get('/', async (req, res) => {
  try {
      const products = await productManager.getProducts();
      res.render('home', { products });
  } catch (error) {
      console.log(error);
  }
});

//Ruta con WebSocket
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
}); */

//Http Server
const httpServer = app.listen(PORT, () => {
  console.log(`Server run OK in port: ${PORT}`);
});

//WebSocket Server Connection
const socketServer = new Server(httpServer);
const allProducts = await productManager.getProducts();

socketServer.on("connection", (socket) => {
  console.log("User connection established!", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected!", socket.id);
  });

  /*   socket.emit('saludoDesdeBack', 'Welcome to the WebSocket Sever!'); //Envio desde Back/Server
  socket.on('respuestaDesdeFront', (message) => { // Respuesta/Recibo desde Front
    console.log(message);
  }); */
  socketServer.emit("arrayProducts", allProducts); // Muestra en tiempo real el array de productos

  socket.on("newProduct", async (product) => {
    try {
      await productManager.addProduct(product);
      const arrayProducts = await productManager.getProducts();
      socketServer.emit("arrayProducts", arrayProducts); //!ENVÍO A TODOS
      // socket.emit('arrayProducts', arrayProducts)       //!ENVÍO AL SOCKET EN PARTICULAR
      // socket.broadcast.emit('arrayProducts', arrayProducts)    //!ENVÍO A TODOS MENOS AL QUE ENVÍA
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("deleteProduct", async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      const arrayProducts = await productManager.getProducts();
      socketServer.emit("arrayProducts", arrayProducts);
    } catch (error) {
      console.log(error);
    }
  });
});
