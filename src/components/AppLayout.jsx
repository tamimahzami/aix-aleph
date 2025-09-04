import React from "react"
import Header from "./Header.jsx"
import Sidebar from "./Sidebar.jsx"

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
