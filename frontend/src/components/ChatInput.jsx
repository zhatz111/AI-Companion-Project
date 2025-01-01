import React from 'react'
import { useState, useEffect } from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
import { AuthContext } from "../api/AuthContext";

const ChatInput = ({ item, onSendMessage, user }) => {
    const [text, setText] = useState("");
    const firstName = item.name.split(" ")[0]
    const userData = localStorage.getItem("user");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (text.trim()) {
        const newMessage = {
          id: Date.now(),
          text,
          time: "Just now",
          sender: "sender",
        };
        onSendMessage(newMessage);
        setText("");
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          // Check if the user is logged in
          if (!userData) {
              // Optionally, show a message or prevent action
              alert("You must be logged in to send a message.");
          }
          
          handleSubmit(event); // Call the submit function if logged in
          }
      };
  
  
    return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="chat" className="sr-only">
            Your message
        </label>
        <div className="flex justify-center pl-8 relative">
          <div className="relative w-5/6">
            <textarea
              id="chat"
              rows="1"
              wrap="soft"
              className="block resize-none rounded-lg outline-none p-4 w-full text-md bg-[#303030] text-white pr-12" // Add padding-right to avoid overlap
              placeholder={`Message ${firstName}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              
            ></textarea>
            <button
              type="submit"
              disabled={!userData} // Disable button if user is not logged in or message is empty
              className="absolute top-1/2 right-3 transform -translate-y-1/2 p-3 text-[#FF6FCF] rounded-full cursor-pointer hover:bg-gray-300 bg-gray-100"
            >
              <FaArrowUpLong />
            </button>
          </div>
        </div>
    </form>
  )
}

export default ChatInput