#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticRoot = path.resolve(__dirname, "academy-static");
const publicRoot = path.resolve(__dirname, "../public");
const port = Number(process.env.PORT || 5201);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function resolveFile(pathname) {
  if (pathname === "/academy" || pathname === "/acade" || pathname === "/academy/") {
    return path.join(staticRoot, "index.html");
  }

  const fromPublic = path.normalize(path.join(publicRoot, pathname));
  if (fromPublic.startsWith(publicRoot) && fs.existsSync(fromPublic) && fs.statSync(fromPublic).isFile()) {
    return fromPublic;
  }

  return null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "127.0.0.1"}`);
  const pathname = decodeURIComponent(url.pathname);
  const filePath = resolveFile(pathname);

  if (!filePath) {
    send(res, 404, "Not found. Use http://127.0.0.1:5173/academy with Vite running.");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Academy helper ready at http://127.0.0.1:${port}/academy`);
  console.log(`Vite academy page: http://127.0.0.1:5173/academy`);
});
