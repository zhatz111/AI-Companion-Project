import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import messagesData from '../data/messages.json'
import MessageCard from '../components/MessageCard';
import MessageProfile from '../components/MessageProfile';

const ChatPage = ({ isOpen }) => {
    const location = useLocation();
    const item = location.state; // Safely access the passed item
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      // Simulate fetching data
      setMessages(messagesData);
    }, []);
  
    const handleSendMessage = (newMessage) => {
      setMessages([...messages, newMessage]);
    };
  
    return (
        <body>
            <div className="flex flex-row h-screen">
                <div className="flex flex-col w-full ml-4 mr-4 mt-16 max-w-sm bg-[#212121] border-r border-[#FF6FCF] overflow-y-scroll scrollbar">
                    <MessageCard item={item} />
                    <MessageProfile item={item} />
                </div>
                <div className="flex flex-col w-full mt-20 mb-4 mr-4 max-w bg-[#212121] rounded-lg">
                    <MessageList item={item} messages={messages} />
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </body>
    )
}

export default ChatPage