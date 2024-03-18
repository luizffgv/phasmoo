function getBuildID() {
  const buildID = new URLSearchParams(location.search).get("build_id");
  if (buildID == null)
    throw new TypeError("Service worker received null build ID.");
  return buildID;
}

const buildID = getBuildID();

async function putInCache(request, response) {
  const cache = await caches.open(buildID);
  await cache.delete(request, { ignoreSearch: true });
  await cache.put(request, response);
}

async function useCacheFallback(request) {
  return fetch(request)
    .then((response) => {
      putInCache(request, response.clone());
      return response;
    })
    .catch(() => caches.match(request, { ignoreSearch: true }));
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key != buildID).map((key) => caches.delete(key)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  if (this.location.origin == new URL(event.request.url).origin)
    event.respondWith(useCacheFallback(event.request));
  else event.respondWith(fetch(event.request));
});
