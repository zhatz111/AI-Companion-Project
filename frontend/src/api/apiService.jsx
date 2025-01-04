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
    console.log("Data coming from Auth:", response.data["access_token"]);
    // localStorage.setItem('token', response.data["access_token"]); // Save the token directly
    return response.data; // Contains the JWT token
  };

export const getUserData = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    console.log("this is an easter egg")
    return response.data;
  };

export const checkConversation = async (username, aiCharacter, token) => {
    // Ensure parameters are URL-encoded to handle any special characters
    const url = `${API_BASE_URL}/api/check_conversation?user=${encodeURIComponent(username)}&ai_character=${encodeURIComponent(aiCharacter)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      // mode: 'no-cors', // Bypasses CORS
    });

    if (response.status === 404) return null; // No conversation exists
    if (!response.ok) {
      throw new Error('Failed to check conversation');
    }
    return response.json();
  };

export const createConversation = async (conversationData, token) => {
    try {
      // Ensure conversationData has the correct structure
      console.log('Request Body:', JSON.stringify(conversationData.ai_character));

      const response = await fetch(`${API_BASE_URL}/api/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token for user authentication
        },
        body: JSON.stringify(conversationData.ai_character), // Pass only ai_character here
        // mode: 'no-cors', // Bypasses CORS
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('API Error:', errorDetails);
        throw new Error('Failed to create conversation');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in createConversation:', error.message);
      throw error;
    }
  };

// Function to send a message
export const sendMessage = async (conversationId, content, token) => {
    const messageData = {
      "conversation_id": conversationId,
      "content": content
    }
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
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

export const loadMessages = async (conversationId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/${conversationId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to load messages");
      }
  
      const data = await response.json();
      return data; // Return the messages data
    } catch (error) {
      console.error("Error loading messages:", error);
      throw error; // Re-throw the error to handle it in the calling component
    }
  };

// Function to generate an AI response
export const generateAIResponse = async (conversationId, content, aiCharacter, systemPrompt, token) => {
    const requestData = {
      conversation_id: conversationId,
      content: content,
      ai_character: aiCharacter,
      system_prompt: systemPrompt
    };

    const response = await fetch(`${API_BASE_URL}/generate-response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    return response.json();
  };

export const forgotPassword = async (email) => {
    console.log(email)
    const data = qs.stringify({
      "email": email, // Pass the email as the payload
    });

    console.log("Data sent to API (Forgot Password):", data);

    const response = await axios.post(
      `${API_BASE_URL}/api/forgot-password`, // Adjust the endpoint path as needed
      data, // Pass the form-encoded data
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Forgot Password Response:", response.data);
    return response.data; // Return the API response
  };

export const resetPassword = async (newPassword, confirmNewPassword, token) => {
    const data = qs.stringify({
      "new_password": newPassword,           // New password field
      "confirm_new_password": confirmNewPassword, // Confirm new password field
      "token": token,                        // Reset token
    });
  
    console.log("Data sent to API (Reset Password):", data);
  
    const response = await axios.post(
      `${API_BASE_URL}/api/reset-password`, // Adjust the endpoint path as needed
      data, // Pass the form-encoded data
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
    console.log("Reset Password Response:", response.data);
    return response.data; // Return the API response
  };

export const sendFeedback = async (email, subject, message) => {
    const data = qs.stringify({
      "email": email, // Email field
      "subject": subject, // Subject field
      "message": message, // Message field
    });
  
    console.log("Feedback send to API:", data);
  
    const response = await axios.post(
      `${API_BASE_URL}/api/contact-us`, // Adjust the endpoint path as needed
      data, // Pass the form-encoded data
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
    console.log("Feedback Form Response:", response.data);
    return response.data; // Return the API response
  };

  