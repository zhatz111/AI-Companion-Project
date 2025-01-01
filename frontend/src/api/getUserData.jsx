import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";

const API_BASE_URL = "http://localhost:8000";

const getUserData = async ( token ) => {
  const response = await axios.get(`${API_BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default getUserData;
