const ws = new WebSocket("ws://localhost:8080");
const chat = document.getElementById("chat");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

ws.onmessage = async (event) => {
  let messageContent;

  if (event.data instanceof Blob) {
    messageContent = await event.data.text();
  } else {
    messageContent = event.data;
  }

  const message = document.createElement("div");
  message.textContent = messageContent;
  chat.appendChild(message);
};

sendButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  if (username && message) {
    ws.send(`${username}: ${message}`);
    messageInput.value = "";
  }
});
