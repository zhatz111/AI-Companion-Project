import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
import { AuthContext } from "../api/AuthContext";
import { ConversationContext } from '../api/ConversationContext';
import { BsArrowsCollapseVertical } from "react-icons/bs";

const ChatInput = ({ item, onSendMessage, onClick }) => {
    const [text, setText] = useState("");
    const firstName = item.name.split(" ")[0]
    const { user } = useContext(AuthContext);
    const { currentConversation } = useContext(ConversationContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (text.trim()) {
        const newMessage = {
          sender: user.username,
          content: text,
          timeCreated: Date.now(),
          conversation_id: currentConversation.id
        };
        onSendMessage(newMessage);
        setText("");
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          // Check if the user is logged in
          if (!user) {
              // Optionally, show a message or prevent action
              alert("You must be logged in to send a message.");
              setText("");
              event.preventDefault(); // Prevent newline
              return; // Exit the function early
          }
          
          handleSubmit(event); // Call the submit function if logged in
          }
      };
  
  
    return (
      <div className="flex items-center max-w-6xl mx-auto px-4 w-full">
        {/* Collapse Button */}
        <div className="flex items-center justify-center px-2">
          <BsArrowsCollapseVertical
            className="text-white cursor-pointer"
            size={30}
            onClick={onClick} // Toggle visibility
          />
        </div>

        {/* Form */}
        <form className="flex-grow" onSubmit={handleSubmit}>
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex justify-center relative w-full">
            <div className="relative w-full  ">
              <textarea
                id="chat"
                rows="1"
                wrap="soft"
                className="block resize-none rounded-lg outline-none p-4 w-full text-md bg-[#303030] text-white pr-12 h-14"
                placeholder={`Message ${firstName}`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
              <button
                type="submit"
                disabled={!user} // Disable button if user is not logged in or message is empty
                className="absolute top-1/2 right-3 transform -translate-y-1/2 p-3 text-[#FF6FCF] rounded-full cursor-pointer hover:bg-gray-300 bg-gray-100"
              >
                <FaArrowUpLong />
              </button>
            </div>
          </div>
        </form>
      </div>

  )
}

export default ChatInput