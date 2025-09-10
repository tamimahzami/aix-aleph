// src/main.tsx
import React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ToastProvider } from "./lib/toast"
import router from "./lib/router"
import "./styles.css"

const rootEl = document.getElementById("root")
if (!rootEl) throw new Error("Missing #root element")

createRoot(rootEl).render(
  <ToastProvider>
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}  // <- Hier gehört das Flag hin
    />
  </ToastProvider>
)
