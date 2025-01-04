import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const getUserData = async ( token ) => {
  const response = await axios.get(`${API_BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data)
  return response.data;
};

export default getUserData;
