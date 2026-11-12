const http = require("node:http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/health") {
    res.writeHead(200);
    return res.end(JSON.stringify({
      status: "online",
      name: "Two Brain Cells"
    }));
  }

  if (req.url === "/api/chat" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      let message = "";

      try {
        message = JSON.parse(body).message || "";
      } catch {
        res.writeHead(400);
        return res.end(JSON.stringify({
          error: "Invalid message"
        }));
      }

      res.writeHead(200);
      res.end(JSON.stringify({
        reply: "I received your message! My AI brain is still being connected."
      }));
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({
    error: "Page not found"
  }));
});

server.listen(PORT, () => {
  console.log(`Two Brain Cells is running on port ${PORT}`);
});
