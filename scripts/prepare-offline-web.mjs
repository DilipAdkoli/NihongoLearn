import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const output = "dist";

async function filesUnder(directory) {
  const entries = await readdir(join(output, directory), {
    withFileTypes: true,
  });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = directory ? `${directory}/${entry.name}` : entry.name;
      return entry.isDirectory() ? filesUnder(path) : [path];
    }),
  );
  return files.flat();
}

const html = await readFile(join(output, "index.html"), "utf8");
const offlineHead = [
  '<link rel="manifest" href="/manifest.webmanifest" />',
  '<link rel="apple-touch-icon" href="/icon-192.png" />',
  '<meta name="theme-color" content="#244f41" />',
  '<script src="/register-offline.js" defer></script>',
].join("\n");
if (!html.includes("</head>"))
  throw new Error("Web export is missing its HTML head.");
await writeFile(
  join(output, "index.html"),
  html.replace("</head>", offlineHead + "\n</head>"),
);

const files = (await filesUnder(""))
  .filter((file) => file !== "offline-assets.json")
  .sort();
const hash = createHash("sha256");
for (const file of files) {
  hash.update(file + "\0").update(await readFile(join(output, file)));
}
const version = hash.digest("hex").slice(0, 20);
const worker = join(output, "service-worker.js");
const workerSource = await readFile(worker, "utf8");
if (!workerSource.includes("__NIHONGO_CACHE_VERSION__"))
  throw new Error("Missing offline cache version marker");
await writeFile(
  worker,
  workerSource.replace("__NIHONGO_CACHE_VERSION__", version),
);
const assets = files.filter((file) => file !== "service-worker.js");
await writeFile(
  join(output, "offline-assets.json"),
  JSON.stringify({ version, assets }) + "\n",
);
console.log(`Prepared offline cache ${version} with ${assets.length} assets.`);
