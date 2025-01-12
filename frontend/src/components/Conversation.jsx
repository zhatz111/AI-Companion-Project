import React, { useContext, useState } from 'react'
import { ConversationContext } from '../api/ConversationContext';

const Conversation = ({ currConversation, isActive }) => {
    const handleClick = () => {
        setCurrentConversation(currConversation); // Call your existing function
        setCurrentMessages(currConversation.messages)
      };

    // Input datetime string from Python
    const pythonDateString = currConversation.created_at;

    // Append "Z" if missing
    let jsDateString = pythonDateString.replace(/\.\d+/, ""); // Remove microseconds
    if (!jsDateString.endsWith("Z")) {
        jsDateString += "Z"; // Ensure it has "Z" to indicate UTC
    }

    // Convert to JavaScript Date object assuming UTC
    const date = new Date(jsDateString);

    // Get the user's timezone name
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Format the date to a human-readable string in the user's local time
    const humanReadableDate = date.toLocaleString(undefined, {
        weekday: "short",   // Include day of the week
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short", // Include short timezone abbreviation
        timeZone: timezoneName // Explicitly set the user's time zone
    });

    // Combine all details into a final string
    const finalOutput = `${humanReadableDate}`;


    // const finalOutput = `${humanReadableDate}`; // (${timezoneName}, ${formattedOffset})
    
    const { setCurrentConversation, setCurrentMessages } = useContext(ConversationContext);

  return (
    <div
      className={`rounded-xl cursor-pointer p-3 text-nowrap w-full max-w-sm ${
        isActive ? "bg-gray-800/60 border" : "bg-gray-800/60" // Highlight active, default others
      } hover:bg-gray-500`}
      onClick={handleClick}
    >
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-white text-sm pb-2">{finalOutput}</h1>
        <p className="text-gray-300 text-sm">
          {currConversation.messages[currConversation.messages.length - 1]?.content?.slice(0, 35)}
        </p>
      </div>
    </div>
  )
}

export default Conversation