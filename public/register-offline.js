if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").catch((error) => {
    console.warn("Offline study could not be enabled.", error);
  });
}
