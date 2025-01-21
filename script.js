const ws = new WebSocket("ws://localhost:8080");
const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const username = prompt("Enter your name.");

// Check if user entered a valid name to chat, if not it will reload the page.
if (!username || username.trim() === "") {
  alert("You need to enter valid name, To Start chat.");
  location.reload();
}

// To display the message in the page
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
// to send message whan the user click send button
sendButton.addEventListener("click", () => {
  let message = messageInput.value.trim();
  if (username && message) {
    ws.send(`${username}: ${message}`);
    messageInput.value = "";
  }
});
// to send message whan the user click Enter in keybord
document.addEventListener("keyup", (key) => {
  let message = messageInput.value.trim();
  if (key.code === "Enter") {
    if (username && message) {
      ws.send(`${username}: ${message}`);
      messageInput.value = "";
    }
  }
});
