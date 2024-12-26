import React from 'react'
import Message from './Message'

const MessageList = ({ item, messages }) => {
  return (
    <div className="flex flex-col p-6 overflow-y-scroll scrollbar">
      {messages.map((message) => (
        <Message key={message.id} item={item} text={message.text} time={message.time} sender={message.sender} />
      ))}
    </div>
  )
}

export default MessageList