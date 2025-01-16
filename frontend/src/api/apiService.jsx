import axios from "axios";
import qs from "qs";

const API_BASE_URL = "https://api.sweetaura.ai"; // Replace with your backend URL if different
// http://localhost:8000

export const register = async (username, email, password, confirmPassword) => {
  try {
    // Log the data being sent to the API
    console.log('Registering user with the following data:', { username, email });

    // Make the POST request to the API
    const response = await axios.post(`${API_BASE_URL}/api/register`, {
      username,
      email,
      password,
      confirmPassword
    });

    // Log the response data for debugging
    console.log('API response:', response);

    // Return the response data (JWT token or error message)
    return response.data;
  } catch (error) {
    // Log error details for better debugging
    console.error('Error during registration:', error);

    // If the error is from Axios, log the details
    if (error.response) {
      // Server responded with a non-2xx status code
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // No response received from the server
      console.error('Error request data:', error.request);
    } else {
      // General error in setting up the request
      console.error('Error message:', error.message);
    }

    // Optionally, throw the error to be handled higher up (or show a user-friendly message)
    throw new Error('Registration failed. Please try again later.');
  }
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

export const getUserData = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data;
  };

export const listConversation = async (email, aiCharacter, token) => {
    // Ensure parameters are URL-encoded to handle any special characters
    const url = `${API_BASE_URL}/api/check_conversation?user=${encodeURIComponent(email)}&ai_character=${encodeURIComponent(aiCharacter)}`;
    
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
    return response.data;
  };

export const checkConversation = async (email, aiCharacter, token) => {
    // Ensure parameters are URL-encoded to handle any special characters
    const url = `${API_BASE_URL}/api/check_conversation?user=${encodeURIComponent(email)}&ai_character=${encodeURIComponent(aiCharacter)}`;
    
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

export const validateToken = async (token) => {
    try {
      console.log(token);
  
      const response = await axios.post(
        `${API_BASE_URL}/api/token/validate`, 
        {}, // No need to send token in body
        {
          headers: {
            "Content-Type": "application/json", // This can be application/json or you can omit it if you're sending an empty body
            "Authorization": `Bearer ${token}`, // Send the token in Authorization header
          },
        }
      );
      return response.data.message === "Token is valid"; // Return true if token is valid
    } catch (error) {
      console.error("Token validation failed:", error);
      return false; // Return false on failure
    }
  };


export const validateRefreshToken = async (refreshToken) => {
    try {
      console.log(refreshToken); // Log the token to ensure it's correct
  
      // Send the refresh token in the Authorization header
      const response = await axios.post(
        `${API_BASE_URL}/api/refresh`,
        {}, // No need to send the token in the body
        {
          headers: {
            "Content-Type": "application/json", // You can omit this or use application/json for an empty body
            "Authorization": `Bearer ${refreshToken}`, // Send refresh token in Authorization header
          },
        }
      );
  
      if (response.data && response.data.access_token) {
        // Return success if a new access token is present
        return { success: true, access_token: response.data.access_token };
      }
  
      return { success: false, message: 'Invalid response data' }; // Handle unexpected responses
    } catch (error) {
      console.error("Token validation failed:", error);
      return { success: false, message: error.message || "An error occurred" };
    }
  };
  
export const changeUserInfo = async (username, email, password, token) => {
    try {
      // Define the request body
      console.log(username)
      const userData = {
        "username": username || null,
        "email": email || null,  // If no email, send null
        "password": password || null,
      };

      console.log(userData)
      // Make the POST request
      const response = await axios.post(`${API_BASE_URL}/api/change-user-info`, userData, {
        headers: {
          "Authorization": `Bearer ${token}`, // Replace with your token retrieval logic
        },
      });

      if (response.status === 409) {
          throw new Error("This email is already registered.");
      }
  
      // Return the updated user data
      return response.data;

    } catch (error) {
      if (error.response) {
        // Handle server errors
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.detail || 'Failed to update user info.');

      } else if (error.request) {
        // Handle network errors
        console.error('No response received:', error.request);
        throw new Error('No response received from server.');

      } else {
        // Handle other errors
        console.error('Error:', error.message);
        throw new Error(error.message || 'An unexpected error occurred.');
      }
    }
  };

export const updatePersonalInfo = async (
  age,
  height_feet,
  height_inches,
  weight,
  gender,
  identity,
  sexuality,
  politics,
  token
) => {
    try {
      // Define the request body
      console.log(age)
      const userData = {
        "age": age || null,
        "height_feet": height_feet || null,
        "height_inches": height_inches || null,
        "weight": weight || null,
        "gender": gender || null,
        "identity": identity || null,
        "sexuality": sexuality || null,
        "politics": politics || null,
      };

      console.log(height_inches)

      console.log(userData)
      // Make the POST request
      const response = await axios.post(`${API_BASE_URL}/api/update-personal-info`, userData, {
        headers: {
          "Authorization": `Bearer ${token}`, // Replace with your token retrieval logic
        },
      });
  
      // Return the updated user data
      return response.data;

    } catch (error) {
      if (error.response) {
        // Handle server errors
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.detail || 'Failed to update user info.');

      } else if (error.request) {
        // Handle network errors
        console.error('No response received:', error.request);
        throw new Error('No response received from server.');
        
      } else {
        // Handle other errors
        console.error('Error:', error.message);
        throw new Error(error.message || 'An unexpected error occurred.');
      }
    }
  };

  // Function to delete chats
export const deleteConversation = async (conversationID, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/delete-chat/${conversationID}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });

      if (response.ok) {
          // Optionally, update the UI or notify the user
          console.log('Chat deleted successfully');
          // Update the ConversationContext or remove the chat from the list
          // Example: remove the chat from the state
      } else {
          const error = await response.json();
          console.error('Error deleting chat:', error.detail);
          alert('Failed to delete chat');
      }
  } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred');
  }
  };

  // Function to delete chats
export const deleteConvos = async (token) => {
    try {
      // Make the DELETE request to the API
      const response = await axios.delete(`${API_BASE_URL}/api/delete-chats`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Assuming you are using a Bearer token for authentication
        }
      });

      if (response.status === 500) {
          throw new Error("No conversations to delete.");
      }
  
      // Return the response from the server
      return response.data;
    } catch (error) {
      console.error('Error deleting chats:', error);
      throw error;
    }
  };

    // Function to delete account along with chats
export const deleteUserAccount = async (token) => {
  try {
    // Make the DELETE request to the API
    const response = await axios.delete(`${API_BASE_URL}/api/delete-account`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Assuming you are using a Bearer token for authentication
      }
    });

    // Return the response from the server
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export const uploadImage = async (file, token) => {
  // Create FormData to send the file
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/save-image-content`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Propagate the error for further handling
  }
};
  

  