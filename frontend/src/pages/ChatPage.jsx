import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import MessageProfile from '../components/MessageProfile';
import { BsArrowsCollapseVertical } from "react-icons/bs";

import { AuthContext } from "../api/AuthContext";
import { ConversationContext } from '../api/ConversationContext';
import { CharacterContext } from '../api/CharacterContext';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { itemId } = useParams();
    const { user, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { getOrCreateConversation, currentConversation, loadMessages, sendMessage, currentMessages } = useContext(ConversationContext);
    const { characters, currentCharacter } = useContext(CharacterContext);

    // Memoize the conversation fetch logic and handle localStorage
    useEffect(() => {
        const fetchConversation = async () => {
            if (!token || !user) {
                setLoading(false); // Ensure loading stops if not authenticated
            }

            setLoading(true); // Set loading to true when fetching starts

            try {
                // Check if a conversation exists in localStorage
                let conversation = JSON.parse(localStorage.getItem('currentConversation'));
                if (!conversation || conversation.itemId !== itemId) {
                    // Fetch new conversation if not in localStorage or itemId doesn't match
                    conversation = await getOrCreateConversation(itemId);
                    // Save the new conversation to localStorage
                    localStorage.setItem('currentConversation', JSON.stringify(conversation));
                }

                console.log("Fetched conversation:", conversation);
            } catch (error) {
                console.error("Error fetching conversation:", error);
            } finally {
                setLoading(false); // Mark loading as complete
            }
        };

        fetchConversation();
    }, [itemId, token, user, getOrCreateConversation]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentConversation?.id) {
                setLoading(true);
                try {
                    const messagesData = await loadMessages();
                    setMessages(messagesData);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (currentConversation?.id) fetchMessages();
    }, [currentConversation?.id, token]);

    const handleSendMessage = async (newMessage) => {
        await sendMessage(currentConversation.id, newMessage);
        setNewMessage(''); // Clear input after sending
    };

    return (
        <>
            {currentCharacter ? (
                <div className="flex h-screen overflow-y-hidden">
                    <div className={` ${isCollapsed ? 'w-0' : 'w-100'} flex flex-col max-w-mm sm:max-w-sm lg:max-w-md xl:max-w-lg overflow-y-auto scrollbar duration-500`}>
                        <MessageProfile isCollapsed={isCollapsed} item={currentCharacter} />
                    </div>

                    <div className={`flex flex-col ${isCollapsed ? 'flex-grow' : 'flex-1'} max-h-screen pb-2 mt-auto bg-[#212121] transition-all duration-500`}>
                        <div className="p-4 mt-16 pb-10 overflow-y-auto scrollbar">
                            <MessageList item={currentCharacter} messages={currentMessages} />
                        </div>
                        <div className="sticky bottom-0 bg-[#212121] p-4">
                            <ChatInput item={currentCharacter} onSendMessage={handleSendMessage} onClick={() => setIsCollapsed(!isCollapsed)} />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Page item is not present</p>
            )}
        </>
    );
};

export default ChatPage;
