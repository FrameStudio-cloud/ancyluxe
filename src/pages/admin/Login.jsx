import { useState } from "react";
import { useNavigate } from "react-router-dom";
import shop from "../../config/shop";

const ADMIN_PASSWORD = "bloom2024";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("bp_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#FDF6EF" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl text-gray-800 font-light mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {shop.name} <span className="text-pink-400">{shop.nameAccent}</span>
          </h1>
          <p
            className="text-gray-400 text-sm"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Admin Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50">
          <p
            className="text-gray-700 font-medium mb-5 text-sm"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Enter your password to continue
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors mb-3 ${
              error
                ? "border-red-300 bg-red-50"
                : "border-gray-200 focus:border-pink-400"
            }`}
            style={{ fontFamily: "DM Sans, sans-serif" }}
          />

          {error && (
            <p
              className="text-red-400 text-xs mb-3"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Incorrect password. Try again.
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#2D5A3D",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
