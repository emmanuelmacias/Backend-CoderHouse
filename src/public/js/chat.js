const socketClient = io();

/* CHAT */

let username = null;

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

if (!username) {
  Swal.fire({
    title: "¡Welcome to chat!",
    text: "Insert your username here",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Your username is required";
      }
    },
  }).then((input) => {
    username = input.value;
    socketClient.emit("newUser", username);
  });
}


btn.addEventListener("click", (e) => {
  e.preventDefault();
  socketClient.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socketClient.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `
      <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
      ${msg.username}
      <div class="media-body">
        <p>${msg.message}</p>
      </div>  
      `;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

socketClient.on("newUser", (username) => {
  Toastify({
    text: `🟢 ${username} is logged in`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)"
    },
    onClick: ()=>{}
  }).showToast();
});

message.addEventListener("keyup", () => {
  socketClient.emit("chat:typing", username);
});

socketClient.on("chat:typing", (data) => {
  actions.innerHTML = data
    ? `<p style="padding: 10px 25px; margin: 0; font-size: 1rem"> ${data} is writing a message... </p>`
    : "";
});
