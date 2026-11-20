function offlineUnavailable() {
  if (navigator.serviceWorker?.controller) return;
  document.documentElement.dataset.offlineUnavailable = "true";
  window.dispatchEvent(new Event("nihongolearn-offline-state"));
}

const serviceWorker = navigator.serviceWorker;
if (serviceWorker) {
  serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      function watchInstall() {
        const worker = registration.installing;
        if (!worker) return;
        function inspect() {
          if (worker.state === "redundant") offlineUnavailable();
          if (worker.state === "redundant" || worker.state === "activated")
            worker.removeEventListener("statechange", inspect);
        }
        worker.addEventListener("statechange", inspect);
        inspect();
      }
      watchInstall();
      registration.addEventListener("updatefound", watchInstall);
    })
    .catch((error) => {
      offlineUnavailable();
      console.warn("Offline study could not be enabled.", error);
    });
} else {
  offlineUnavailable();
}
