const http = require("http");
var fs = require("fs");
let url = require("url");

const hostname = "127.0.0.1";
const port = 3000;
const clients = new Set();

let subscribers = Object.create(null);

let longPollingCount = 0;

function onSubscribe(req, res) {
  let id = Math.random();

  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");

  subscribers[id] = res;

  req.on("close", function () {
    delete subscribers[id];
  });
}

function publish(message) {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(message);
  }

  subscribers = Object.create(null);
}

const server = http.createServer((req, res) => {
  let urlParsed = url.parse(req.url, true);
  if (urlParsed.pathname == "/subscribe") {
    onSubscribe(req, res);

    if (longPollingCount < 5) {
      setTimeout(() => {
        longPollingCount++;
        req.setEncoding("utf8");
        let message = "asdfads";
        req
          .on("data", function (chunk) {
            message += chunk;
          })
          .on("end", function () {
            publish(message); // publish it to everyone
          });
      }, 1000);
    }
    return;
  }

  // sending a message
  if (urlParsed.pathname == "/publish" && req.method == "POST") {
    // accept POST
    req.setEncoding("utf8");
    let message = "";
    req
      .on("data", function (chunk) {
        message += chunk;
      })
      .on("end", function () {
        publish(message); // publish it to everyone
        res.end("ok");
      });

    return;
  }

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

function close() {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end();
  }
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

if (process.send) {
  process.on("message", (msg) => {
    if (msg === "shutdown") {
      close();
    }
  });
}

process.on("SIGINT", close);
