const cachePrefix = "nihongolearn-offline-";
const catalogUrl = new URL("offline-assets.json", self.registration.scope);
const version = "__NIHONGO_CACHE_VERSION__";
const activeCache = cachePrefix + version;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const response = await fetch(catalogUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("Offline asset list unavailable");
      const catalog = await response.json();
      if (catalog.version !== version)
        throw new Error("Offline asset list changed during install");
      const cache = await caches.open(activeCache);
      await cache.addAll(
        catalog.assets.map((path) => new URL(path, self.registration.scope)),
      );
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter(
            (name) => name.startsWith(cachePrefix) && name !== activeCache,
          )
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

async function audioRange(cached, header) {
  const range = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!range || (!range[1] && !range[2])) return cached;
  const bytes = await cached.arrayBuffer();
  const size = bytes.byteLength;
  const start = range[1]
    ? Number(range[1])
    : Math.max(0, size - Number(range[2]));
  const end =
    range[1] && range[2] ? Math.min(size - 1, Number(range[2])) : size - 1;
  if (start >= size || end < start) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` },
    });
  }
  return new Response(bytes.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": cached.headers.get("Content-Type") || "audio/mpeg",
      "Accept-Ranges": "bytes",
      "Content-Length": String(end - start + 1),
      "Content-Range": `bytes ${start}-${end}/${size}`,
    },
  });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.href.startsWith(self.registration.scope)
  )
    return;
  if (
    url.href === catalogUrl.href ||
    url.pathname.endsWith("/service-worker.js")
  )
    return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(activeCache);
      const key =
        request.mode === "navigate"
          ? new URL("index.html", self.registration.scope)
          : request;
      const cached = await cache.match(key, { ignoreSearch: true });
      if (!cached) return fetch(request);
      const range = request.headers.get("Range");
      return range && url.pathname.endsWith(".mp3")
        ? audioRange(cached, range)
        : cached;
    })(),
  );
});
