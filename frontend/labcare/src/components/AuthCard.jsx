import React, { useState, useContext } from "react";
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

export default function AuthCard() {
  const [mode, setMode] = useState("signin");
  const isSignup = mode === "signup";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (isSignup) {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      data = await response.json();
      if (data) setUser(data);
    } else {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      data = await response.json();
      if (data) setUser(data);
    }
    if (data?.token) {
      setToken(data.token);
      navigate("/dashboard");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#081026] via-[#071032] to-[#061427] p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white/5 backdrop-blur-md border border-white/6 p-8 md:p-12 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isSignup ? "Create Account" : "Welcome back"}
            </h2>
            <p className="text-sm text-white/80">
              {isSignup ? "Sign up to get started" : "Sign in to continue"}
            </p>
          </div>
          <button
            onClick={() => setMode(isSignup ? "signin" : "signup")}
            className="flex items-center gap-2 bg-white/6 hover:bg-white/8 text-white/95 px-3 py-2 rounded-lg"
          >
            {isSignup ? <FiLogIn /> : <FiUserPlus />}
            <span className="text-sm">{isSignup ? "Sign in" : "Sign up"}</span>
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {isSignup && (
            <div>
              <label className="text-xs text-white/70 mb-1 block">
                Full name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-white/60">
                  <FiUser />
                </span>
                <input
                  required
                  name="name"
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/6 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition"
                />
              </div>
            </div>
          )}
          <div>
            <label className="text-xs text-white/70 mb-1 block">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-white/60">
                <FiMail />
              </span>
              <input
                required
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="you@gmail.com"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/6 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#34d399]/40 transition"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/70 mb-1 block">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-white/60">
                <FiLock />
              </span>
              <input
                required
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/6 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#60a5fa]/40 transition"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-white/75">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[#7c3aed] h-4 w-4 rounded"
              />
              <span>Remember me</span>
            </label>
            {!isSignup && (
              <a href="#" className="text-white/90 underline decoration-dotted">
                Forgot password?
              </a>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white py-3 rounded-2xl font-semibold shadow-lg transform-gpu active:scale-95 transition"
          >
            {isSignup ? <FiUserPlus /> : <FiLogIn />}
            <span>{isSignup ? "Create Account" : "Sign In"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
