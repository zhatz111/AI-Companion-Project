import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useLocation  } from 'react-router-dom';

import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import MessageProfile from '../components/MessageProfile';
import ConversationList from '../components/ConversationList';

import { AuthContext } from "../api/AuthContext";
import { ConversationContext } from '../api/ConversationContext';
import { CharacterContext } from '../api/CharacterContext';
import { EventContext } from '../api/EventContext';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { itemId } = useParams();
    const { user, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isConvoCollapsed, setIsConvoCollapsed] = useState(false);
    const [isProfileCollapsed, setIsProfileCollapsed] = useState(false);
    const isFetchingConversation = useRef(false);

    const { screenWidth } = useContext(EventContext);
    const { activeView, setActiveView } = useContext(ConversationContext);

    const { setCurrentCharacter } = useContext(CharacterContext);
    const location = useLocation();

    // useEffect(() => {
    //     // Cleanup logic: Reset currentCharacter when leaving this route
    //     return () => {
    //     setCurrentCharacter(null);
    //     localStorage.setItem('currentCharacter', null)
    //     };
    // }, [setCurrentCharacter]);



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

    const handleResponsiveView = (screenWidth, setActiveView) => {
        if (screenWidth < 1024) {
          setActiveView("convos");
        } else {
          setActiveView(null);
        }
      };
    
    useEffect(() => {
        const updateView = () => {
          const screenWidth = window.innerWidth;
          handleResponsiveView(screenWidth, setActiveView);
        };
    
        // Initial check
        updateView();
    
        // Add event listener
        window.addEventListener("resize", updateView);
    
        // Cleanup event listener
        return () => window.removeEventListener("resize", updateView);
      }, []);

    return (
        <>
        {currentCharacter ? (
            <div className="flex flex-row w-full h-[calc(100vh-270px)] md:h-[calc(100vh-170px)] 2xl:h-[calc(100vh-90px)]">
                
                {/* Conversation list - Sidebar Left */}
                {(activeView === null || activeView === "convos") && (
                <div className="bg-[#212121] flex flex-shrink-0 mx-auto">
                    <ConversationList isCollapsed={false} item={itemId} />
                </div>
                )}

                {/* Chat Message - Main Content */}
                {(activeView === null || activeView === "chat") && (
                <div className="flex flex-col w-full justify-end bg-[#212121]">
                
                    {/* Scrollable Message List */}
                    <div className="flex flex-col p-6 mx-auto overflow-y-auto scrollbar w-full">
                        <MessageList item={currentCharacter} messages={currentMessages} />
                    </div>

                    {/* Chat message bar */}
                    <div className="flex bg-[#212121] py-4 w-full">
                        <ChatInput
                        item={currentCharacter}
                        onSendMessage={handleSendMessage}
                        onClickConvo={() => setIsConvoCollapsed(!isConvoCollapsed)}
                        onClickProfile={() => setIsProfileCollapsed(!isProfileCollapsed)}
                        />
                    </div>
                </div>
                )}

                {/* Message Profile - Sidebar Right */}
                {(activeView === null || activeView === "profile") && (
                <div className="flex flex-col max-w-sm mx-auto bg-[#212121] overflow-y-auto scrollbar">
                    <MessageProfile item={currentCharacter} />
                </div>
                )}

            </div>
        ) : (
            <div></div>
        )}
        </>

    );
    
};

export default ChatPage;
