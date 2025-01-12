import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register, getUserData, validateToken, validateRefreshToken } from "./apiService"; // Ensure validateToken is implemented in apiService.jsx

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null)

  const login = async (email, password) => {
    if (user) {
      console.log("User is already logged in");
      return; // Don't trigger login if the user is already logged in
    }

    try {
      console.log("attempting login");
      const { access_token, refresh_token } = await apiLogin(email, password);
      console.log(access_token)
      const userData = await getUserData(access_token);

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(access_token);
      localStorage.setItem("token", access_token);

      setRefreshToken(refresh_token)
      localStorage.setItem('refresh_token', refresh_token);

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      if (error.response) {
        console.log("Detailed error:", error.response.data);
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  };
  

  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password);
      return data; // Return data if needed
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const updateUser = (newUser) => {
    setUser(newUser); // Update the user in context
    localStorage.setItem('user', JSON.stringify(newUser)); // Update the user in local storage
  };
  

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refresh_token");
  
        if (storedUser && storedToken && storedRefreshToken) {
          const isValid = await validateToken(storedToken);
          if (isValid) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
          } else {
            const { success, access_token } = await validateRefreshToken(storedRefreshToken);
            if (success) {
              setToken(access_token);
              localStorage.setItem("token", access_token);
            } else {
              logout();
            }
          }
        }
      } catch (error) {
        console.error("Error during token validation:", error);
        logout();
      }
    };
  
    // Call fetchUserInfo immediately
    fetchUserInfo();
  
    // Periodic token validation
    const interval = setInterval(async () => {
      try {
        if (token) {
          const isValid = await validateToken(token);
          if (!isValid) {
            const { success, access_token } = await validateRefreshToken(refreshToken);
            if (success) {
              setToken(access_token);
              localStorage.setItem("token", access_token);
            } else {
              logout();
            }
          }
        }
      } catch (error) {
        console.error("Error during periodic validation:", error);
        logout();
      }
    }, 10 * 60 * 1000); // Validate every 10 minutes
  
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [token, refreshToken]);
  

  return (
    <AuthContext.Provider value={{ user, token, login, logout, registerUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
