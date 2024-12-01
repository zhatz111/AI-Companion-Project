import React from 'react'

const ChatInput = ({ onSend }) => {
  return (
    <div>
        <div className="flex items-center px-4 py-2 bg-gray-100">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button
                className="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none"
                onClick={handleSend}
            >
                Send
            </button>
        </div>
    </div>
  )
}

export default ChatInput