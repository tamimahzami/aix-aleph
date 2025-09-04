import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DiscordShell from "./components/DiscordShell";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import "./styles.css";

const NotFound = () => (
  <div style={{ padding: 24 }}>
    <h1>404</h1>
    <p>Diese Seite gibt’s (noch) nicht.</p>
  </div>
);

const router = createBrowserRouter([
  {
    element: <DiscordShell />,
    children: [
      { index: true, element: <Home /> },     // "/"
      { path: "/home", element: <Home /> },
      { path: "/features", element: <Features /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <NotFound /> },   // 404
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  </React.StrictMode>
);
