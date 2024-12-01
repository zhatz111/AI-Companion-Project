import React from 'react'

const ChatHeader = () => {
  return (
    <div>
        <div className="flex items-center justify-between px-4 py-2 bg-blue-600">
            <h2 className="text-lg text-white font-semibold">ChatGPT</h2>
            <button className="text-white focus:outline-none">✕</button>
        </div>
    </div>
  )
}

export default ChatHeader