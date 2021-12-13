const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const audio = new Audio('ting.mp3');


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";


});
let name2 = prompt("Enter your name");
name2 = name2.trim();
name2 = name2.slice(0, 1).toUpperCase() + name2.slice(1);


socket.emit("new-user-joined", name2);
socket.on("user-joined", name2 => {
    append(`${name2} joined the chat`, "right");
})
socket.on("receive", data => {
    audio.play();
    append(`${data.name2}:${data.message}`, "left");
})
socket.on("left", name2 => {
    append(`${name2}:left the chat`, "right");
})
