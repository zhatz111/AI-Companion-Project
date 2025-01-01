// ConversationContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { sendMessage, createConversation } from './apiService'; // import necessary API functions
import { AuthContext } from './AuthContext'; // to get the token

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Access token from AuthContext
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  // Function to create a new conversation
  const createNewConversation = async (conversationData) => {
    if (!token) {
      console.error('User is not authenticated');
      return;
    }
    try {
      const conversation = await createConversation(conversationData, token);
      setConversations((prevConversations) => [...prevConversations, conversation]);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  // Function to send a new message
  const sendNewMessage = async (messageData) => {
    if (!token) {
      console.error('User is not authenticated');
      return;
    }
    try {
      const message = await sendMessage(messageData, token);
      if (currentConversation) {
        setCurrentConversation((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        setConversations,
        currentConversation,
        setCurrentConversation,
        createNewConversation,
        sendNewMessage,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
