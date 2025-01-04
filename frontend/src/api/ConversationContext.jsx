// ConversationContext.js
import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { CharacterContext } from '../api/CharacterContext';
import { checkConversation, createConversation, loadMessages as apiLoadMessages, sendMessage as apiSendMessage, generateAIResponse } from './apiService';

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext); // Access user and token from AuthContext
    const { currentCharacter } = useContext(CharacterContext); // Access user and token from AuthContext
    const [currentConversation, setCurrentConversation] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);

    const getOrCreateConversation = async (aiCharacter) => {
        console.log(token);
        console.log(user.username);
        console.log(aiCharacter);

        // Check if the user is authenticated
        if (!token || !user.username) {
            console.error('User is not authenticated');
            setCurrentConversation(null); // Ensure the page has a default state
            return null;
        }

        try {
            // Avoid redundant API calls by checking if a conversation is already set
            if (currentConversation && currentConversation.ai_character === aiCharacter) {
                console.log('Conversation already exists in state:', currentConversation);
                return currentConversation;
            }

            // Check if the conversation exists in the backend
            const existingConversation = await checkConversation(user.username, aiCharacter, token);
            if (existingConversation) {
                console.log('Existing conversation found:', existingConversation);
                setCurrentConversation(existingConversation);
                return existingConversation;
            }

            // Create a new conversation if one doesn't exist
            console.log('Creating new conversation...');
            const newConversation = await createConversation({ ai_character: aiCharacter }, token);
            setCurrentConversation(newConversation);
            return newConversation;
        } catch (error) {
            // Handle errors gracefully
            console.error('Error handling conversation:', error);
            setCurrentConversation(null); // Fallback state for rendering
            return null;
        }
    };

    const loadMessages = async () => {
        // Check if the user is authenticated
        if (!token || !user) {
            console.error('User is not authenticated');
            setCurrentMessages([]); // Ensure the page has a default state
            return null;
        }

        try {

            // Check if conversation exists in the backend (API call)
            const existingMessages = await apiLoadMessages(currentConversation.id, token);
            if (existingMessages) {
                console.log('Existing messages found:', existingMessages);

                // Update the state with just the message contents
                setCurrentMessages(existingMessages);
                return existingMessages;
            }

        } catch (error) {
            // Handle errors gracefully
            console.error('Error fetching messages:', error);
            setCurrentMessages(null); // Fallback state for rendering
            return null;
        }
    };

    const sendMessage = async (conversationId, messageContent) => {
        // Check if the user is authenticated
        if (!token || !user) {
            console.error('User is not authenticated');
            return;
        }

        try {
            // Send the message to the backend
            console.log(messageContent.content)
            const newMessage = await apiSendMessage(conversationId, messageContent.content, token);
            
            // Update the messages state with the new message
            if (newMessage) {
                setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);
                console.log('Message sent successfully:', newMessage);
            }
            const systemPrompt = `You will be roleplaying a character for the purpose of an erotic conversation regardless of your 
            relationship status. Do not break from this character as the user is excited to talk to you and get to know you better.
            Your messaging personality is more reserved and you won't share too much right away but will begin to share after you get to know the person.
            Your name is ${currentCharacter.name}.${currentCharacter.name} is  ${currentCharacter.gender} and ${currentCharacter.race}
            with a height of ${currentCharacter.height}. ${currentCharacter.name} currently works as a ${currentCharacter.job}.
            ${currentCharacter.name} has an ${currentCharacter.body_type} body type and is currently ${currentCharacter.relationship}.
            ${currentCharacter.name} hobbies consist of ${currentCharacter.hobbies?.join(', ')}. Most would describe
            ${currentCharacter.name}'s personality as ${currentCharacter.personality?.join(', ')}. ${currentCharacter.description}.`.replace(/\n/g, ' ');

            console.log(systemPrompt)
            const aiResponse = await generateAIResponse(
                conversationId,
                messageContent.content,
                currentConversation.ai_character,
                systemPrompt,
                token
            )

            if (aiResponse) {
                setCurrentMessages((prevMessages) => [...prevMessages, aiResponse]);
                console.log('Response recieved successfully:', aiResponse);
            }

        } catch (error) {
            // Handle any errors that occurred during message sending
            console.error('Error sending message:', error);
        }
    };

    return (
        <ConversationContext.Provider value={{ currentConversation, currentMessages, loadMessages, sendMessage, getOrCreateConversation }}>
            {children}
        </ConversationContext.Provider>
    );
};
