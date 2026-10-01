/* The HR Blueprint service worker.
   Static files: cache first. Pages you have opened: network first, cached copy when the signal drops.
   Never caches the API, sign in, or admin. Cleared on sign out. */
const STATIC = "hrbp-static-v1";
const PAGES = "hrbp-pages-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== STATIC && k !== PAGES) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("message", (e) => {
  if (e.data === "clear") e.waitUntil(caches.delete(PAGES));
});

const OFFLINE_HTML = `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title>
<body style="margin:0;font-family:system-ui,sans-serif;background:#0F2744;color:#fff;display:grid;place-items:center;min-height:100vh;padding:24px;text-align:center">
<div><div style="font-size:40px;margin-bottom:12px">📶</div><h1 style="font-size:22px;margin:0 0 10px">You are offline right now.</h1>
<p style="color:rgba(255,255,255,.75);max-width:34ch;margin:0 auto">Steps you have already opened still work. Reconnect to open new ones. Anything you write is saved and syncs when you are back.</p></div></body>`;

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const p = url.pathname;
  if (p.startsWith("/api") || p.startsWith("/auth") || p.startsWith("/admin") || p.startsWith("/signin") || p === "/sw.js") return;

  if (p.startsWith("/_next/static") || p.startsWith("/icons/")) {
    e.respondWith(caches.open(STATIC).then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    }));
    return;
  }

  if (p === "/" || p.startsWith("/app") || p.startsWith("/preview")) {
    e.respondWith((async () => {
      const c = await caches.open(PAGES);
      try {
        const res = await fetch(req);
        if (res.ok && !res.redirected) c.put(req, res.clone());
        return res;
      } catch {
        const hit = await c.match(req, { ignoreVary: true });
        if (hit) return hit;
        if (req.mode === "navigate") return new Response(OFFLINE_HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } });
        return Response.error();
      }
    })());
  }
});
