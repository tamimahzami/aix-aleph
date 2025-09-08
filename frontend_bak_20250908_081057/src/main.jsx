// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import "./index.css";

// PWA: Service Worker Auto-Update + optional Refresh-Banner
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const updateSW = registerSW({
  onNeedRefresh() {
    // Optional: dezentes Banner/Toast – hier direkt Reload
    if (confirm("Ein Update ist verfügbar. Neu laden?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    // Optional: Toast "Offline bereit!"
    console.log("AIX Aleph ist jetzt offline verfügbar.");
  },
});
