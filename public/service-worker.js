const cachePrefix = "nihongolearn-offline-";
const catalogUrl = new URL("offline-assets.json", self.registration.scope);
const indexUrl = new URL("index.html", self.registration.scope);
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

self.addEventListener("message", (event) => {
  if (event.data?.type === "activate-update")
    event.waitUntil(self.skipWaiting());
});

async function olderCaches() {
  const names = await caches.keys();
  const activeIndex = names.indexOf(activeCache);
  if (activeIndex < 0) return [];
  return names
    .slice(0, activeIndex)
    .filter((name) => name.startsWith(cachePrefix));
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const older = await olderCaches();
      // Tabs with the previous build can still request its bundled assets.
      let previous;
      for (const name of [...older].reverse()) {
        if (await caches.match(indexUrl, { cacheName: name })) {
          previous = name;
          break;
        }
      }
      await Promise.all(
        older
          .filter((name) => name !== previous)
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

async function findAsset(cache, request) {
  const key = request.mode === "navigate" ? indexUrl : request;
  const cached = await cache.match(key, { ignoreSearch: true });
  if (cached || request.mode === "navigate") return cached;
  for (const name of (await olderCaches()).reverse()) {
    const previous = await caches.match(key, {
      cacheName: name,
      ignoreSearch: true,
    });
    if (previous) return previous;
  }
}

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
      const cached = await findAsset(cache, request);
      if (!cached) return fetch(request);
      const range = request.headers.get("Range");
      return range && url.pathname.endsWith(".mp3")
        ? audioRange(cached, range)
        : cached;
    })(),
  );
});
