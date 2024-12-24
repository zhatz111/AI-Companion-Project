import React from 'react'

const ChatPage = ({ isOpen }) => {
  return (
    <div>
        <div className={`flex flex-col ${isOpen ? 'pl-60' : 'pl-20'} w-full min-h-screen bg-[#121212] text-gray-200 py-4 sm:py-20 sm:ml-4 transition-all duration-300 ease-in-out`}>
            <div className="flex flex-row h-full w-full overflow-x-hidden">
            {/* Sidebar */}
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-[#1E1E1E] text-gray-300 flex-shrink-0">
                <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-400 bg-indigo-800 h-10 w-10">
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                    </svg>
                </div>
                <div className="ml-2 font-bold text-2xl text-white">QuickChat</div>
                </div>
                <div className="flex flex-col items-center bg-[#2E2E2E] border border-gray-700 mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 rounded-full border border-gray-600 overflow-hidden">
                    <img
                    src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                    alt="Avatar"
                    className="h-full w-full"
                    />
                </div>
                <div className="text-sm font-semibold mt-2 text-white">Aminos Co.</div>
                <div className="text-xs text-gray-400">Lead UI/UX Designer</div>
                <div className="flex flex-row items-center mt-3">
                    <div className="flex flex-col justify-center h-4 w-8 bg-green-500 rounded-full">
                    <div className="h-3 w-3 bg-[#121212] rounded-full self-end mr-1"></div>
                    </div>
                    <div className="leading-none ml-1 text-xs text-gray-400">Active</div>
                </div>
                </div>
                <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold text-gray-300">Active Conversations</span>
                    <span className="flex items-center justify-center bg-gray-600 h-4 w-4 rounded-full text-white">
                    4
                    </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                    {['Henry Boyd', 'Marta Curtis', 'Philip Tucker', 'Christine Reid', 'Jerry Guzman'].map(
                    (name, index) => (
                        <button
                        key={index}
                        className="flex flex-row items-center hover:bg-gray-700 rounded-xl p-2"
                        >
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600`}>
                            {name.charAt(0)}
                        </div>
                        <div className="ml-2 text-sm font-semibold">{name}</div>
                        </button>
                    )
                    )}
                </div>
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-[#1E1E1E] h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                        {/* Chat Messages */}
                        {[
                        { sender: true, message: 'Hey, how are you today?' },
                        { sender: true, message: 'Lorem ipsum dolor sit amet...' },
                        { sender: false, message: "I'm ok, what about you?" },
                        ].map((chat, index) => (
                        <div
                            key={index}
                            className={`col-start-${chat.sender ? '1' : '6'} col-end-${
                            chat.sender ? '8' : '13'
                            } p-3 rounded-lg`}
                        >
                            <div
                            className={`flex flex-row ${
                                chat.sender ? '' : 'justify-start flex-row-reverse'
                            } items-center`}
                            >
                            <div
                                className={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600`}
                            >
                                A
                            </div>
                            <div
                                className={`relative ${
                                chat.sender ? 'ml-3' : 'mr-3'
                                } text-sm ${
                                chat.sender ? 'bg-gray-800' : 'bg-indigo-700'
                                } text-white py-2 px-4 shadow rounded-xl`}
                            >
                                <div>{chat.message}</div>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage