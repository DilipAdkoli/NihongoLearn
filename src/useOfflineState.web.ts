import { useEffect, useState } from "react";
import type { OfflineState } from "./useOfflineState";

export function useOfflineState(): OfflineState {
  const [state, setState] = useState<OfflineState>("local");

  useEffect(() => {
    if (!document.querySelector('script[src="/register-offline.js"]')) return;
    const worker = navigator.serviceWorker;
    function update() {
      if (worker?.controller) setState("ready");
      else if (!worker || document.documentElement.dataset.offlineUnavailable)
        setState("unavailable");
      else setState("loading");
    }

    update();
    worker?.addEventListener("controllerchange", update);
    window.addEventListener("nihongolearn-offline-state", update);
    return () => {
      worker?.removeEventListener("controllerchange", update);
      window.removeEventListener("nihongolearn-offline-state", update);
    };
  }, []);

  return state;
}
