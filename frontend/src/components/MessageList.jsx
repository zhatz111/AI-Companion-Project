import React, { useEffect, useState, useRef, useContext } from 'react';
import Message from './Message';
import { ConversationContext } from '../api/ConversationContext';

// Function to calculate relative time
function calculateRelativeTime(timestamp) {
  const utcTimestamp = timestamp.endsWith("Z") ? timestamp : timestamp + "Z";
  const now = new Date().getTime();
  const time = new Date(utcTimestamp).getTime(); // Automatically parses as UTC if "Z" is present
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr`;

  const daysAgo = Math.floor(diffInSeconds / 86400);
  return daysAgo === 1 ? 'Yesterday' : `${daysAgo} day(s)`;
}

// Function to append relativeTime to each message
function addRelativeTimeToMessages(messages) {
  return messages.map((message) => ({
    ...message,
    relativeTime: calculateRelativeTime(message.time_created),
  }));
}

const MessageList = ({ item, messages }) => {
  const { currentMessages } = useContext(ConversationContext);
  const [refreshedMessages, setRefreshedMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref to track the end of the messages list

  // Update messages with relative time whenever the `messages` prop changes
  useEffect(() => {
    setRefreshedMessages(addRelativeTimeToMessages(messages));
  }, [messages]);

  // Update relative time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshedMessages((prevMessages) =>
        prevMessages.map((message) => ({ 
          ...message,
          relativeTime: calculateRelativeTime(message.time_created),
        }))
      );
    }, 60000); // Refresh every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      {refreshedMessages.map((message) => (
        <Message
          key={message.id}
          item={item}
          text={message.content}
          time={message.relativeTime} // Use relativeTime from state
          sender={message.sender}
        />
      ))}
    </>
  );
};

export default MessageList;

