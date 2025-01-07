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

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", access_token);
      localStorage.setItem('refresh_token', refresh_token);

      setUser(userData);
      setToken(access_token);
      setRefreshToken(refresh_token)
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      if (error.response) {
        console.log("Detailed error:", error.response.data);
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
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
        const storedRefreshToken = localStorage.getItem("refresh_token")

        if (storedUser && storedToken && storedRefreshToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setRefreshToken(storedRefreshToken)
          
        }
      } catch (error) {
        console.error("Error during token validation:", error);
        logout();
      }
    };

    fetchUserInfo();

    // Periodic token validation
    const interval = setInterval(async () => {
      if (token) {
        try {

          const isValid = await validateToken(token);
          if (!isValid) {
            const { success, access_token } = await validateRefreshToken(refreshToken);

            if (!success) {
              // If token is invalid, log out the user
              console.warn("Token expired during session. Logging out...");
              logout();
            } else {
              // If the refresh token is valid, store the new access token
              console.log("New access token received.");
              localStorage.setItem("token", access_token); // Save the new access token in localStorage
              setToken(access_token)
              // Optionally, you can also update any other state related to the user or token
            }

        }
        } catch (error) {
          console.error("Error during periodic token validation:", error);
          logout();
        }
      }
    }, 30 * 60 * 1000); // Validate every 5 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, registerUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
