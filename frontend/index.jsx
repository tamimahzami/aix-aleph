import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./styles/global.css";
import "./styles/first-pulse.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Fehlt: <div id="root"></div> in index.html');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
