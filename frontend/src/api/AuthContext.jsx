import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register } from "./apiService"; // Import functions from apiService.jsx

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user info and token on initial load
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing user or token from localStorage:", error);
      }
    }
    setLoading(false); // Mark loading as complete
  }, []);

  const login = async (email, password) => {
    try {
      console.log("attempting login")
      const { access_token, user: userData } = await apiLogin(email, password); // Adjust based on your backend response
      setUser(userData);
      setToken(access_token);
      localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
      localStorage.setItem("token", access_token); // Persist token
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message)
      if (error.response) {
        console.log("Detailed error:", error.response.data);
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password); // Call register function from auth.jsx
      return data; // Return data if needed
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Render a loading state while initializing
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
