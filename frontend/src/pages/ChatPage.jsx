import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';

import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import MessageProfile from '../components/MessageProfile';
import ConversationList from '../components/ConversationList';

import { AuthContext } from "../api/AuthContext";
import { ConversationContext } from '../api/ConversationContext';
import { CharacterContext } from '../api/CharacterContext';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { itemId } = useParams();
    const { user, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isConvoCollapsed, setIsConvoCollapsed] = useState(false);
    const [isProfileCollapsed, setIsProfileCollapsed] = useState(false);
    const isFetchingConversation = useRef(false);

    const {
        // getOrCreateConversation,
        getConversations,
        createNewConversation,
        currentConversation,
        loadMessages,
        sendMessage,
        currentMessages,
        conversationList,
        setConversationList,
        setCurrentConversation,
        setCurrentMessages
    } = useContext(ConversationContext);

    const { characters, currentCharacter } = useContext(CharacterContext);

    useEffect(() => {
        setCurrentConversation(null)
        setCurrentMessages([])
        setConversationList([])
        const fetchConversations = async () => {
            
            if (!token || !user || isFetchingConversation.current) {
                setLoading(false);
                return;
            }
    
            isFetchingConversation.current = true; // Prevent multiple calls
            setLoading(true);
    
            try {
                // Fetch existing conversations
                const conversations = await getConversations(itemId);
                if (!conversations || conversations.length === 0) {
                    // If no conversations exist, create a new one
                    const newConversation = await createNewConversation(itemId);
                    localStorage.setItem('currentConversations', JSON.stringify([newConversation]));
                    console.log("Created new conversation:", newConversation);
                } else {
                    localStorage.setItem('currentConversations', JSON.stringify(conversations));
                    console.log("Fetched conversations:", conversations);
                }
            } catch (error) {
                console.error("Error fetching or creating conversation:", error);
            } finally {
                setLoading(false);
                isFetchingConversation.current = false; // Allow future calls
            }
        };
    
        fetchConversations();
    }, [itemId, token, user]);

    const handleSendMessage = async (newMessage) => {
        await sendMessage(currentConversation.id, newMessage);
        setNewMessage(''); // Clear input after sending
    };

    return (
        <div className="flex h-screen">
        {currentCharacter ? (
            <div className="flex flex-row justify-evenly h-full w-full">
            {/* Message Profile - Sidebar Left */}
            <div
                className={`${
                isConvoCollapsed ? 'hidden' : 'flex'
                }  flex-col bg-[#1e1e1e] overflow-y-auto scrollbar border-r border-[#FF6FCF]`}
            >
                <ConversationList isCollapsed={isConvoCollapsed} item={itemId} />
            </div>

            {/* Chat Message - Main Content */}
            <div
                className={`flex flex-col flex-[4] ${
                isConvoCollapsed ? 'w-full' : ''
                } max-h-screen bg-[#212121] transition-all duration-500`}
            >
                {/* Scrollable Message List */}
                <div className="p-2 mt-16 mb-2 mx-6 flex-1 overflow-y-auto scrollbar">
                <MessageList item={currentCharacter} messages={currentMessages} />
                </div>

                {/* Sticky Chat Input */}
                <div className="bg-[#212121] py-4">
                <ChatInput
                    item={currentCharacter}
                    onSendMessage={handleSendMessage}
                    onClickConvo={() => setIsConvoCollapsed(!isConvoCollapsed)}
                    onClickProfile={() => setIsProfileCollapsed(!isProfileCollapsed)}
                />
                </div>
            </div>

            {/* Message Profile - Sidebar Right */}
            <div
                className={`${
                isProfileCollapsed ? 'hidden' : 'flex'
                } flex-[2] flex-col max-w-xs lg:max-w-sm bg-[#1e1e1e] overflow-y-auto scrollbar transition-all duration-500`}
            >
                <MessageProfile isCollapsed={isProfileCollapsed} item={currentCharacter} />
            </div>
            </div>
        ) : (
            <p>Page item is not present</p>
        )}
        </div>

    );
    
};

export default ChatPage;
