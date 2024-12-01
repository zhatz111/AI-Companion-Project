import React, { useState } from "react"

const ChatMessages = ({ messages }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;
        onSend(input);
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
        handleSend();
        }
    };
  return (
    <div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
            <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : ""}`}
            >
            {message.type === "bot" && (
                <div className="flex-shrink-0">
                <img
                    className="h-8 w-8 rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt="Bot"
                />
                </div>
            )}
            <div
                className={`ml-3 ${
                message.type === "user" ? "mr-3 text-right" : ""
                }`}
            >
                <div
                className={`p-2 rounded-lg ${
                    message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                >
                {message.text}
                </div>
                <span className="text-xs text-gray-500 mt-1 block">{message.time}</span>
            </div>
            </div>
        ))}
        </div>
  );
    </div>
  )
}

export default ChatMessages

