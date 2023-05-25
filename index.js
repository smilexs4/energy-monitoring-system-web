const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

const PORT = 3000;

app.use(express.static("public"));

app.ws("/subscribe", function (ws, req) {
  console.log("Subscriber connected");
});

app.ws("/publish", function (ws, req) {
  console.log("Publisher connected");
  ws.on("message", function (data) {
    for (let client of expressWs.getWss("/subscribe").clients) {
      client.send(data);
    }
  });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
