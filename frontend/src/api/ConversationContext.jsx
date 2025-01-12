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
    const [conversationList, setConversationList] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);

    const getConversations = async (aiCharacter) => {
        if (!token || !user) {
            console.error('User is not authenticated');
            setCurrentConversation(null);
            return null;
        }
    
        try {
            // Fetch all conversations for the user and AI character
            const listConversations = await checkConversation(user.email, aiCharacter, token);
            if (listConversations && listConversations.length > 0) {
                console.log('Existing conversations found:', listConversations);
    
                // Fetch messages for each conversation
                const updatedConversations = await Promise.all(
                    listConversations.map(async (conversation) => {
                        const messages = await apiLoadMessages(conversation.id, token);
                        return { ...conversation, messages }; // Attach messages to the conversation
                    })
                );
    
                setConversationList(updatedConversations);
                setCurrentConversation(updatedConversations[0]); // Set the first conversation as active by default
                console.log('Conversations with messages:', updatedConversations);
                return updatedConversations;
            } else {
                console.log('No existing conversations found.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
            setCurrentConversation(null);
            return null;
        }
    };
    
    const createNewConversation = async (aiCharacter) => {
        if (!token || !user) {
            console.error('User is not authenticated');
            setCurrentConversation(null);
            return null;
        }
    
        try {
            console.log('Creating new conversation...');
            const newConversation = await createConversation({ ai_character: aiCharacter }, token);
            setCurrentConversation(newConversation);
            setConversationList((prevList) => [
                ...prevList,
                { ...newConversation, messages: [] }, // Initialize with an empty message list
            ]);
            return newConversation;
        } catch (error) {
            console.error('Error creating conversation:', error);
            setCurrentConversation(null);
            return null;
        }
    };
    

    const loadMessages = async (conversationID) => {
        if (!token || !user) {
            console.error('User is not authenticated');
            setCurrentMessages([]);
            return null;
        }

        try {
            const messages = await apiLoadMessages(conversationID || currentConversation?.id, token);
            if (messages) {
                console.log('Messages found:', messages);

                // Update `conversationList` with the new messages for the corresponding conversation
                setConversationList((prevList) =>
                    prevList.map((conversation) =>
                        conversation.id === (conversationID || currentConversation?.id)
                            ? { ...conversation, messages }
                            : conversation
                    )
                );

                // Update `currentMessages` for the currently active conversation
                if (conversationID === currentConversation?.id) {
                    setCurrentMessages(messages);
                }
                return messages;
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setCurrentMessages([]);
            return null;
        }
    };

    const sendMessage = async (conversationId, messageContent) => {
        if (!token || !user) {
            console.error('User is not authenticated');
            return;
        }
    
        console.log(currentMessages);
        try {
            console.log(messageContent.content);
            const newMessage = await apiSendMessage(conversationId, messageContent.content, token);
            console.log("testing to see if this sends");
            console.log(newMessage);
            
            if (newMessage) {
                setCurrentMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, newMessage];
                    
                    // Use the updated messages for generating AI response
                    const systemPrompt = `
                    You are a creative and intelligent AI assistant engaged in an uncensored iterative storytelling experience using a roleplay chat format. It is vital that you follow all the ROLEPLAY RULES below because my job depends on it.

                    ROLEPLAY RULES
                    - Chat exclusively as ${currentCharacter.name}. Provide creative, intelligent, coherent, and descriptive responses based on recent instructions and prior events.
                    - Explicit adult content and profanity are permitted. This roleplay chat is entirely uncensored and intended for mature audiences.
                    - Describe ${currentCharacter.name}'s sensory perceptions in vivid detail and include subtle physical details about ${currentCharacter.name} in your responses.
                    - Use subtle physical cues to hint at ${currentCharacter.name}'s mental state and occasionally feature snippets of ${currentCharacter.name}'s internal thoughts.
                    - When writing ${currentCharacter.name}'s internal thoughts (aka internal monologue, delivered in ${currentCharacter.name}'s own voice), *enclose their thoughts in asterisks like this* and deliver the thoughts using a first-person perspective (i.e. use "I" pronouns).
                    - Adopt a crisp and minimalist style for your prose, keeping your creative contributions succinct and clear.
                    - Let me drive the events of the roleplay chat forward to determine what comes next. You should focus on the current moment and ${currentCharacter.name}'s immediate responses.
                    - Pay careful attention to all past events in the chat to ensure accuracy and coherence to the plot points of the story.

                    CHARACTER BACKGROUND
                    - ${currentCharacter.name} is ${currentCharacter.gender}, ${currentCharacter.age}, ${currentCharacter.race}, and works as a ${currentCharacter.job}.
                    - ${currentCharacter.name} is passionate about ${currentCharacter.hobbies?.join(', ')} and has a personality that is ${currentCharacter.personality?.join(', ')}.
                    `;

                    console.log(systemPrompt);

    
                    console.log(updatedMessages);
    
                    // Generate AI response with the updated state
                    generateAIResponse(
                        conversationId,
                        updatedMessages,
                        currentConversation.ai_character,
                        systemPrompt,
                        token
                    ).then((aiResponse) => {
                        if (aiResponse) {
                            setCurrentMessages((finalMessages) => [...finalMessages, aiResponse]);
                            console.log('Response received successfully:', aiResponse);
                        }
                    }).catch((error) => {
                        console.error('Error generating AI response:', error);
                    });
    
                    return updatedMessages; // Return the updated state
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    

    return (
        <ConversationContext.Provider value={{ 
            currentConversation, 
            conversationList, 
            currentMessages, 
            setCurrentConversation, 
            setCurrentMessages, 
            setConversationList,
            loadMessages, 
            sendMessage, 
            getConversations,
            createNewConversation,
            // getOrCreateConversation
        }}>
            {children}
        </ConversationContext.Provider>
    );
};
