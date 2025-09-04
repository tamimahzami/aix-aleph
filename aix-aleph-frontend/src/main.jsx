import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import "./i18n"; // i18n früh laden

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
