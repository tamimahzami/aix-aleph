// src/sw-register.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      // Optional: listen for updates
      reg.addEventListener("updatefound", () => {
        const nw = reg.installing;
        nw && nw.addEventListener("statechange", () => {
          if (nw.state === "installed") {
            // If there's an existing controller, a new SW is ready
            if (navigator.serviceWorker.controller) {
              console.info("[SW] Update ready – reload to use the latest version.");
            } else {
              console.info("[SW] App cached for offline use.");
            }
          }
        });
      });
    } catch (e) {
      console.warn("[SW] registration failed:", e);
    }
  });
}
