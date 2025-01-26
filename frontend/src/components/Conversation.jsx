import React, { useContext, useState } from 'react'
import { ConversationContext } from '../api/ConversationContext';

const Conversation = ({ currConversation, isActive, onDelete }) => {
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
    
    const { setCurrentConversation, setCurrentMessages, setActiveView } = useContext(ConversationContext);

  return (
    <div
      className={`flex flex-row rounded-xl cursor-pointer p-3 text-nowrap w-full max-w-sm ${
        isActive ? "bg-gray-800/60 border" : "bg-gray-800/60" // Highlight active, default others
      } hover:bg-gray-500`}
      onClick={() => {
        handleClick();
      }}
    >
      <div className="w-full flex flex-col justify-center"
      onClick={() => {
        setActiveView("chat");
      }}
      >
        <h1 className="text-white text-sm pb-2">{finalOutput}</h1>
        <p className="text-gray-400 text-sm">
          {currConversation.messages[currConversation.messages.length - 1]?.content?.slice(0, 35) || "New Chat"}
        </p>
      </div>
      <div className='flex p-2 z-30'>
        <button
          onClick={onDelete} // Trigger the delete when clicked
          className="inline-flex items-center px-2 py-2 bg-red-600/60 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
          disabled={!isActive}
        >
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Conversation