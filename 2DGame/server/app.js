const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

var position = {
  x: 200,
  y: 200,
};

Socketio.on("connection", (socket) => {
  socket.emit("position", position);
  socket.on("move", (data) => {
    // Sends to that specific client
    switch (data) {
      case "left":
        position.x -= 5;
        Socketio.emit("position", position); //Sends the position to all connected clients
        break;
      case "right":
        position.x += 5;
        Socketio.emit("position", position); //Sends the position to all connected clients
        break;
      case "up":
        position.y -= 5;
        Socketio.emit("position", position); //Sends the position to all connected clients
        break;
      case "down":
        position.y += 5;
        Socketio.emit("position", position); //Sends the position to all connected clients
        break;
    }
  });
});

Http.listen(8080, () => {
  console.log("Listening  at :8080...");
});
