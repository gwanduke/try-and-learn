const http = require("http");
var fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;
const clients = new Set();

const server = http.createServer((req, res) => {
  fs.readFile("./index.html", "utf-8", (err, data) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});

const wsModule = require("ws");

const webSocketServer = new wsModule.Server({
  server: server,
});

webSocketServer.on("connection", (webSocket, request) => {
  clients.add(webSocket);

  if (webSocket.readyState === webSocket.OPEN) {
    webSocket.send("접속을 환영합니다!");
  }

  webSocket.on("message", (msg) => {
    console.log("Client says....:", msg);
    clients.forEach((ws) => {
      ws.send(msg.toString());
    });
  });

  webSocket.on("error", (error) => {
    console.log("에러");
    webSocket.send("웹소켓 에러", error);
  });

  webSocket.on("close", (msg) => {
    clients.delete(webSocket);
    console.log("연결종료");
    webSocket.send("웹소켓을 종료합니다.");
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
