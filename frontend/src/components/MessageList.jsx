import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import { BsArrowsCollapseVertical } from "react-icons/bs";

// Function to calculate relative time
function calculateRelativeTime(timestamp) {
  const utcTimestamp = timestamp.endsWith("Z") ? timestamp : timestamp + "Z";
  const now = new Date().getTime();
  const time = new Date(utcTimestamp).getTime(); // Automatically parses as UTC if "Z" is present
  const diffInSeconds = Math.floor((now - time) / 1000);
  console.log(now)
  console.log(time)
  console.log(timestamp)
  console.log((now - time))

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
  const [refreshedMessages, setRefreshedMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref to track the end of the messages list

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  // When the messages prop changes, update the refreshedMessages state
  useEffect(() => {
    // Append relative time to each message whenever messages change
    setRefreshedMessages(addRelativeTimeToMessages(messages));
  }, [messages]); // Only rerun when messages change

  useEffect(() => {
    // Update relative time every minute, no need to reset entire messages
    const interval = setInterval(() => {
      setRefreshedMessages((prevMessages) => 
        prevMessages.map((message) => ({
          ...message,
          relativeTime: calculateRelativeTime(message.time_created),
        }))
      );
    }, 60000); // Refresh every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Only run once on mount

  return (
    <div className="message-list-container">
      {refreshedMessages.map((message) => (
        <Message
          key={message.id}
          item={item}
          text={message.content}
          time={message.relativeTime} // Use relativeTime from state
          sender={message.sender}
        />
      ))}
    </div>
  );
};

export default MessageList;
