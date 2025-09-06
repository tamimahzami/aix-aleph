// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/dashboard");

  return (
    <form
      className="max-w-md mx-auto space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await login({ email });
        navigate("/dashboard");
      }}
    >
      <h1 className="text-2xl font-semibold">Login</h1>
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="w-full bg-[var(--color-primary)] text-white rounded px-3 py-2">Einloggen</button>
    </form>
  );
}
