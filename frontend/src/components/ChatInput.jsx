import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
import { AuthContext } from "../api/AuthContext";
import { ConversationContext } from '../api/ConversationContext';
import { BsArrowsCollapseVertical } from "react-icons/bs";
import { BiCollapseHorizontal } from "react-icons/bi";

const ChatInput = ({ item, onSendMessage, onClickConvo, onClickProfile }) => {
    const [text, setText] = useState("");
    const firstName = item.name.split(" ")[0]
    const { user } = useContext(AuthContext);
    const { currentConversation } = useContext(ConversationContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (text.trim()) {
        const newMessage = {
          sender: user.username,
          role: "user",
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
      <div className="flex max-w-3xl w-full mx-auto px-4">

        {/* Collapse Button */}
        {/* <div className="flex items-center justify-center px-2">
          <BiCollapseHorizontal
            className="text-white cursor-pointer"
            size={20}
            onClick={onClickConvo} // Toggle visibility
          />
        </div> */}

        {/* Form */}
        <form className="flex w-full" onSubmit={handleSubmit}>
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex justify-center relative w-full">
            <div className="relative w-full">
              <textarea
                id="chat"
                rows="1"
                wrap="soft"
                className="block resize-none rounded-2xl outline-none p-4 w-full text-sm overflow-hidden sm:text-md bg-[#303030] text-white pr-16 h-14"
                placeholder={`Message ${firstName}`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={(e) => {
                  e.target.style.height = "auto"; // Reset the height
                  e.target.style.height = `${e.target.scrollHeight}px`; // Set it to match content
                }}
              ></textarea>
              <button
                type="submit"
                disabled={!user} // Disable button if user is not logged in or message is empty
                className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2 text-[#FF6FCF] rounded-full cursor-pointer hover:bg-gray-300 bg-gray-100"
              >
                <FaArrowUpLong />
              </button>
            </div>
          </div>
        </form>

        {/* <div className="flex items-center justify-center px-2">
          <BiCollapseHorizontal
            className="text-white cursor-pointer"
            size={20}
            onClick={onClickProfile} // Toggle visibility
          />
        </div> */}
      </div>

  )
}

export default ChatInput