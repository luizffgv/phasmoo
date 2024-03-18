if ("serviceWorker" in navigator) {
  const buildID = document.currentScript?.getAttribute("data-build-id");
  if (buildID == null)
    throw new TypeError(
      "Received null build ID when registering service worker.",
    );
  navigator.serviceWorker.register(`/service-worker.js?build_id=${buildID}`);
}
