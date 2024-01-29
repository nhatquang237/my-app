
const socket = new WebSocket(`ws://localhost:3001/ws/${(new Date()).getTime()}`);

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

export default socket;