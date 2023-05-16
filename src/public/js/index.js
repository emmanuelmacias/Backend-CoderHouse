const socketClient = io();

socketClient.on("saludoDesdeBack", (message) => {
  console.log("Server Message:", message);
});
socketClient.emit("respuestaDesdeFront", "Thank you!");

// Formulario de nuevos productos
const form = document.getElementById("form");
// Inputs del formulario de nuevos productos
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputThumbnail = document.getElementById("thumbnail");
const products = document.getElementById("products");

// Formulario para eliminar producto
const formDeleteProduct = document.getElementById("formDeleteProduct");
const idProduct = document.getElementById("id");

form.onsubmit = (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const description = inputDescription.value;
  const code = inputCode.value;
  const price = inputPrice.value;
  const stock = inputStock.value;
  const category = inputCategory.value;
  const thumbnail = inputThumbnail.value;
  socketClient.emit("newProduct", {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  });
};

socketClient.on("arrayProducts", (array) => {
  console.log(array);
  let infoProducts = "";
  array.forEach((p) => {
    infoProducts += `${p.id}<br>
                        ${p.title}<br>
                        ${p.description}<br>
                        ${p.code}<br>
                        ${p.price}<br>
                        ${p.stock}<br>
                        ${p.category}<br>
                        ${p.thumbnail}<br><br>`;
  });
  products.innerHTML = infoProducts;
});

/* formDeleteProduct.onsubmit = (e) => {
    e.preventDefault();
    const productId = idProduct.value;
    socketClient.emit('deleteProduct', productId);
  }; */

formDeleteProduct.onsubmit = (e) => {
  e.preventDefault();
  const productId = idProduct.value;
  fetch(`/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.log(error);
    });
};
