import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import SmallSidebarButton from './components/SmallSidebarButton';
import SmallSidebar from './components/SmallSidebar';
import Hero from './components/Hero';
import CharacterCards from './components/CharacterCards';
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

// Photos for website
import groupWomenCrop from "../public/images/c_banner.jpg"

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleSidebar = () => setOpen((prev) => !prev);

  const [messages, setMessages] = useState([
    { id: 1, type: "bot", text: "Hello! How can I assist you today?", time: "10:00 AM" },
    { id: 2, type: "user", text: "I need help with my account.", time: "10:01 AM" },
  ]);

  const addMessage = (text, type = "user") => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([...messages, { id: messages.length + 1, type, text, time }]);

    // Simulate bot response
    if (type === "user") {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            type: "bot",
            text: "This is a response from the bot.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className='flex min-h-screen bg-[#212121]'>
      <TopBar isOpen={isOpen} setOpen={setOpen} />
      {/* <SmallSidebarButton toggleSidebar={toggleSidebar} /> */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {/* <SmallSidebar isOpen={isOpen} /> */}
      <div className={`flex flex-col min-h-screen bg-[#212121] py-4 sm:py-20 sm:ml-28 transition-all duration-300 ease-in-out ${isOpen ? "sm:pl-28" : "sm:pl-0"}`}>
        <Hero image={groupWomenCrop}/>
        <section className="bg-[#212121] w-full">
          <CharacterCards/>
        </section>
      </div>
    </div>
    // <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    // <div className="flex flex-col w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
    //   <ChatHeader />
    //   <ChatMessages messages={messages} />
    //   {/* <ChatInput onSend={addMessage} /> */}
    // </div>
  // </div>
  )
}

export default App