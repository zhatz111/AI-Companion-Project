import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import messagesData from '../data/messages.json'
import MessageCard from '../components/MessageCard';
import MessageProfile from '../components/MessageProfile';
import { AuthContext } from "../api/AuthContext";

const ChatPage = () => {
    const location = useLocation();
    const item = location.state; // Safely access the passed item
    const [messages, setMessages] = useState([]);
    const { itemId } = useParams()
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
      // Simulate fetching data
      setMessages(messagesData);
    }, []);
  
    const handleSendMessage = (newMessage) => {
      setMessages([...messages, newMessage]);
    };
  
    return (
        <>
        {
        itemId ? (
            <div className="flex h-screen">
                <div className="flex flex-col ml-4 mr-4 mt-16 max-w-sm border-r border-[#FF6FCF] bg-[#212121] overflow-y-auto scrollbar">
                    <MessageCard item={item} />
                    <MessageProfile item={item} />
                </div>

                <div className="flex flex-col flex-1 mb-2 bg-[#212121]">
                    <div className="p-4 mt-16 overflow-y-auto scrollbar flex-1">
                        <MessageList item={item} messages={messages} />
                    </div>
                    <div className="sticky bottom-0 bg-[#212121] p-4">
                        <ChatInput item={item} onSendMessage={handleSendMessage} user={user} />
                    </div>
                </div>
            </div>
        ) : (
            <p>Page item is not present</p>
        )
        }
        </>
    )
}

export default ChatPage