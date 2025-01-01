import axios from "axios";
import qs from "qs";

const API_BASE_URL = "http://localhost:8000"; // Replace with your backend URL if different

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/api/register`, {
    username,
    email,
    password,
  });
  return response.data; // Contains the JWT token
};

export const login = async (email, password) => {
    const data = qs.stringify({
      "username": email, // OAuth2PasswordRequestForm expects "username"
      "password": password,        // Password remains as is
    });
    console.log("Data sent to API:", data);
  
    const response = await axios.post(
      `${API_BASE_URL}/api/login`,
      data, // Pass the form-encoded data
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Data coming from Auth:", response.data);
    return response.data; // Contains the JWT token
  };

// Function to create a conversation
export const createConversation = async (conversationData, token) => {
    const response = await fetch(`${apiUrl}/api/create_conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(conversationData),
    });
    if (!response.ok) {
      throw new Error('Failed to create conversation');
    }
    return response.json();
  };

// Function to send a message
export const sendMessage = async (messageData, token) => {
    const response = await fetch(`${apiUrl}/api/send_message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  };

//   // Function to get the current user's data
// export const getUserData = async (token) => {
//     const response = await fetch(`${apiUrl}/api/user`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Failed to fetch user data');
//     }
//     return response.json();
//   };