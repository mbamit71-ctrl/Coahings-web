import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(props) {
  const { setIsAuth } = props || {};
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // Added: safe wrapper to avoid "setIsAuth is not a function" errors
  const safeSetIsAuth =
    typeof setIsAuth === "function"
      ? setIsAuth
      : () => {
          // warn once if consumer didn't pass the prop
          if (!safeSetIsAuth._warned) {
            // eslint-disable-next-line no-console
            console.warn("AdminLogin: setIsAuth prop not provided or not a function.");
            safeSetIsAuth._warned = true;
          }
        };

  // Added: safe response parser
  async function parseResponse(res) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      try {
        return await res.json();
      } catch (e) {
        console.error("Invalid JSON response:", e);
        return {};
      }
    }
    // fallback: try text then parse
    const txt = await res.text();
    try {
      return JSON.parse(txt);
    } catch {
      return { message: txt || "" };
    }
  }

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      try {
        const res = await fetch(
          "https://automatic-train-jjwpvrwg55j4fjr5w-3000.app.github.dev/check",
          { method: "GET", credentials: "include" }
        );
        const data = await parseResponse(res);
        if (mounted && res.ok && data && data.ok) {
          safeSetIsAuth(true);
          navigate("/admin/dashboard");
        }
      } catch (err) {
        // fail silently; user will see login form
        console.error("Auth check failed:", err);
      }
    }
    checkAuth();
    return () => {
      mounted = false;
    };
  }, [navigate, setIsAuth]);

  // Updated: safer handling of server response to avoid throwing and to give clearer errors
  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!password) {
      setErr("Password cannot be empty");
      return;
    }

    try {
      const res = await fetch(
        "https://automatic-train-jjwpvrwg55j4fjr5w-3000.app.github.dev/check",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
          credentials: "include",
        }
      );

      const data = await parseResponse(res);

      if (res.ok && data && data.ok) {
        safeSetIsAuth(true);
        navigate("/admin/dashboard");
      } else {
        // show server-provided message or status text/code
        setErr(
          (data && data.message) ||
            res.statusText ||
            `Login failed (status ${res.status})`
        );
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setErr(err?.message || "Server error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
        {err && <p className="mt-3 text-red-600">{err}</p>}
      </form>
    </div>
  );
}
