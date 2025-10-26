import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ setIsAuth }) {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    const res = await fetch("https://automatic-train-jjwpvrwg55j4fjr5w-3000.app.github.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    if (res.ok && data.ok) {
      setIsAuth(true);
      navigate("/admin/dashboard");
    } else {
      setErr(data.message || "Invalid password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
        {err && <p className="mt-3 text-red-600">{err}</p>}
      </form>
    </div>
  );
}
