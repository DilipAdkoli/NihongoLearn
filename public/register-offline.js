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
      let controller = serviceWorker.controller;
      let needsReload = false;
      let applyingUpdate = false;

      function publishUpdate() {
        document.documentElement.dataset.offlineUpdateReady = String(
          Boolean(
            serviceWorker.controller && (registration.waiting || needsReload),
          ),
        );
        window.dispatchEvent(new Event("nihongolearn-offline-state"));
      }

      serviceWorker.addEventListener("controllerchange", () => {
        const next = serviceWorker.controller;
        if (controller && next && next !== controller) {
          if (applyingUpdate) {
            window.location.reload();
            return;
          }
          needsReload = true;
        }
        controller = next;
        publishUpdate();
      });

      window.addEventListener("nihongolearn-offline-update", () => {
        if (needsReload && !registration.waiting) {
          window.location.reload();
        } else if (registration.waiting) {
          applyingUpdate = true;
          registration.waiting.postMessage({ type: "activate-update" });
        }
      });

      function watchInstall() {
        const worker = registration.installing;
        if (!worker) return;
        function inspect() {
          if (worker.state === "redundant") offlineUnavailable();
          publishUpdate();
          if (worker.state === "redundant" || worker.state === "activated") {
            worker.removeEventListener("statechange", inspect);
          }
        }
        worker.addEventListener("statechange", inspect);
        inspect();
      }
      watchInstall();
      publishUpdate();
      registration.addEventListener("updatefound", watchInstall);
    })
    .catch((error) => {
      offlineUnavailable();
      console.warn("Offline study could not be enabled.", error);
    });
} else {
  offlineUnavailable();
}
