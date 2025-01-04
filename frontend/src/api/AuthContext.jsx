import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register, getUserData } from "./apiService"; // Import functions from apiService.jsx
// import getUserData from "./getUserData"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    if (user) {
      console.log("User is already logged in");
      return; // Don't trigger login if the user is already logged in
    }
  
    try {
      console.log("attempting login");
      const { access_token } = await apiLogin(email, password);
      const userData = await getUserData(access_token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", access_token);

      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      if (error.response) {
        console.log("Detailed error:", error.response.data);
      }
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user && token) {
        return; // Don't fetch if user and token are already set
      }
      
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error parsing user or token from localStorage:", error);
      }
    };
  
    fetchUserInfo();
  }, [user, token]); // Only re-run if user or token state changes

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
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

  return (
    <AuthContext.Provider value={{ user, token, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
