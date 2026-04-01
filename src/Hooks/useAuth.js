// src/Hooks/useAuth.js

import { useState } from "react";

const useAuth = () => {
  const [error, setError] = useState("");

  // ── Sign Up ──────────────────────────────────────────────
  // Saves new user to localStorage and creates a session
  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    const exists = users.find((u) => u.email === email);
    if (exists) {
      setError("Email already registered! Please sign in.");
      return false;
    }

    // Save new user to users list
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Save session — this is what ProtectedRoute checks
    localStorage.setItem("loggedInUser", JSON.stringify({ email }));
    return true;
  };

  // ── Sign In ──────────────────────────────────────────────
  // Checks email + password against stored users
  const signIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find matching user
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password. Please try again.");
      return false;
    }

    // Save session
    localStorage.setItem("loggedInUser", JSON.stringify({ email }));
    return true;
  };

  // ── Logout ───────────────────────────────────────────────
  // Removes session — ProtectedRoute will redirect to /signin
  const logout = () => {
    localStorage.removeItem("loggedInUser");
  };

  // ── Is Logged In ─────────────────────────────────────────
  // Returns true if session exists
  const isLoggedIn = () => {
    return !!localStorage.getItem("loggedInUser");
  };

  // ── Get Current User ─────────────────────────────────────
  // Returns { email } of logged in user or null
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("loggedInUser") || "null");
  };

  return {
    signUp,
    signIn,
    logout, 
    isLoggedIn,
    getCurrentUser,
    error,
    setError,
  };
};

export default useAuth;