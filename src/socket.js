
const socketConnect = () => {
  const new_socket = new WebSocket(`ws://localhost:3001/ws/${(new Date()).getTime()}`);
  return new_socket

}

export default socketConnect;
