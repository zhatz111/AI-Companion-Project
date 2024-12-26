import React from 'react'
import { useState, useEffect } from 'react'

const ChatInput = ({ onSendMessage }) => {
    const [text, setText] = useState("");

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
          handleSubmit(event);
        }
      };
  
    return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="chat" className="sr-only">
            Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-md bg-[#303030]">
            <textarea
            id="chat"
            rows="1"
            wrap="soft"
            className="block resize-none rounded-md mx-4 p-2.5 w-full text-sm bg-[#121212] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            ></textarea>
            <button
            type="submit"
            className="inline-flex justify-center p-2 text-[#FF6FCF] rounded-full cursor-pointer hover:text-white hover:bg-[#FF6FCF]"
            >
            <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
            >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            </button>
        </div>
    </form>
  )
}

export default ChatInput