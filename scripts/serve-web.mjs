import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const port =
  args.length === 0
    ? 8081
    : args.length === 2 && args[0] === "--port"
      ? Number(args[1])
      : NaN;
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("Usage: node serve.mjs [--port 8081]");
  process.exit(1);
}

const directory = fileURLToPath(new URL("./", import.meta.url));
const { assets } = JSON.parse(
  await readFile(join(directory, "offline-assets.json"), "utf8"),
);
const files = new Set([...assets, "offline-assets.json", "service-worker.js"]);
const origin = `http://localhost:${port}`;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".mp3": "audio/mpeg",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed.");
    return;
  }

  let path;
  try {
    path = decodeURIComponent(
      new URL(request.url ?? "/", origin).pathname,
    ).slice(1);
  } catch {
    response.writeHead(400).end("Invalid URL.");
    return;
  }

  const navigation =
    !extname(path) && request.headers.accept?.includes("text/html");
  const file = !path || (!files.has(path) && navigation) ? "index.html" : path;
  if (!files.has(file)) {
    response.writeHead(404).end("File not found.");
    return;
  }

  try {
    const data = await readFile(join(directory, file));
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
      "Content-Length": data.length,
      "Cache-Control": "no-cache",
    });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch {
    response.writeHead(500).end("Could not read the exported build.");
  }
});

server.on("error", (error) => {
  console.error(`Could not start the preview: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  console.log(`NihongoLearn is running at ${origin}`);
});
