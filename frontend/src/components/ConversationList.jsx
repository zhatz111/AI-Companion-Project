import React, { useContext, useEffect, useState } from "react";
import Conversation from "./Conversation";
import { AuthContext } from "../api/AuthContext";
import { ConversationContext } from "../api/ConversationContext";
import { deleteConversation } from '../api/apiService'

const ConversationList = ({ item }) => {
    const { token } = useContext(AuthContext);
    const {
        currentConversation,
        conversationList,
        setCurrentConversation,
        setCurrentMessages,
        createNewConversation,
        setConversationList,
    } = useContext(ConversationContext);

    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [filteredConversations, setFilteredConversations] = useState(conversationList);

    // Set the first conversation as active when the conversationList updates
    useEffect(() => {
        if (conversationList.length > 0) {
            setCurrentConversation(conversationList[0]);
            setCurrentMessages(conversationList[0].messages);
        }
    }, [filteredConversations, setCurrentConversation, setCurrentMessages]);

    // Update filtered conversations based on search term
    useEffect(() => {
        if (!searchTerm) {
            // If search term is blank, use the original conversation list
            setFilteredConversations(conversationList);
        } else {
            // Otherwise, filter based on the search term
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = conversationList.filter((conversation) =>
                // Check if any message in the conversation includes the search term
                conversation.messages?.some((message) => 
                    message?.content?.toLowerCase().includes(lowerCaseSearchTerm)
                )
            );
            setFilteredConversations(filtered);
        }
    }, [searchTerm, conversationList]);

    const handleClick = () => {
        // Check if the conversation already exists in the list
        const existingConversation = conversationList.some(
            (conversation) => conversation.id === item.id
        );
    
        // Only create a new conversation if it doesn't already exist
        if (!existingConversation) {
            createNewConversation(item, token);
        } else {
            console.log("Conversation already exists");
        }
    };

    const handleDelete = async () => {
        try {
            // Delete the conversation from the backend
            await deleteConversation(currentConversation.id, token);
    
            // Update the frontend state to remove the conversation from the list
            const updatedConversations = conversationList.filter(
                (conversation) => conversation.id !== currentConversation.id
            );
            setConversationList(updatedConversations)
            // Update the state with the new list of conversations
            setFilteredConversations(updatedConversations);

        } catch (error) {
            console.error("Error deleting conversation:", error);
        }
    };

    return (
        <div className="flex flex-col p-4 items-center justify-between">
            {/* Search Form */}
            <div className="flex gap-2 items-center justify-between">
                <div className="flex">
                    <form
                        className="form relative"
                        onSubmit={(e) => e.preventDefault()} // Prevent form submission
                    >
                        <input
                            className=" rounded-full px-8 py-3 text-white text-sm border-2 border-transparent bg-black focus:outline-none focus:border-[#FF6FCF] placeholder-gray-400 transition-all duration-300 shadow-lg"
                            placeholder="Search..."
                            required
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button
                            type="reset"
                            className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                            onClick={() => setSearchTerm("")} // Clear search term
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </form>
                </div>

                <div className="flex">
                    <button
                        title="Add New"
                        className="flex group cursor-pointer outline-none hover:rotate-90 duration-300"
                        onClick={handleClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40px"
                            height="40px"
                            viewBox="0 0 24 24"
                            className="w-10 h-10 stroke-pink-400 fill-none group-hover:fill-pink-800 group-active:stroke-pink-200 group-active:fill-pink-600 group-active:duration-0 duration-300"
                        >
                            <path
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                strokeWidth="1.2"
                            ></path>
                            <path d="M8 12H16" strokeWidth="1.2"></path>
                            <path d="M12 16V8" strokeWidth="1.2"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Item List */}
            <div className="flex flex-col items-center justify-center gap-4 mt-4 p-2">
                {filteredConversations.map((conversation) => (
                    <Conversation
                        key={conversation.id}
                        currConversation={conversation}
                        isActive={currentConversation?.id === conversation.id}
                        setCurrentConversation={setCurrentConversation}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConversationList;
