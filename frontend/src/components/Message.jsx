import React, { useContext, useRef, useEffect } from 'react'
import { AuthContext } from "../api/AuthContext";

const Message = ({ item, text, time, sender }) => {
  const { user } = useContext(AuthContext);
  const isSender = user?.username && sender === user.username;
  const messagesEndRef = useRef(); // Ref for scrolling
  
  const scrollToElement = () => {
          const {current} = messagesEndRef
           if (current !== null){
             current.scrollIntoView({behavior: "smooth"})
           }
        }
      
  useEffect(scrollToElement, [])

  if (isSender) {
    return (
      <div className="flex w-full items-end justify-end mx-auto" ref={messagesEndRef}>
      <div className="flex flex-col items-end justify-end">
        <span className="text-xs text-gray-500 pb-2 pr-2">{user?.username}</span>
        <div className="bg-[#303030] text-white p-4 rounded-l-2xl rounded-tr-2xl">
          <p className="text-sm lg:text-base">{text}</p>
        </div>
        <span className="text-xs text-gray-500 pt-2 pr-2 leading-none">{time}</span>
      </div>
      <div className="flex pb-5 pl-2 items-end justify-end">
        <div className="h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden bg-gray-300">
          <img className="object-cover h-full w-full" src={user.image_url} alt="Receiver's Avatar" />
        </div>
      </div>
    </div>
    );
  } else {
    return (
      <div className="flex flex-row w-full mt-2 space-y-2 sm:max-w-xs md:max-w-xl" ref={messagesEndRef}>
        <div className="flex items-end pb-5 pr-4 justify-end">
          <div className="h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden bg-gray-300">
            <img className="object-cover h-full w-full" src={item.alt_img_path} alt="Receiver's Avatar" />
          </div>
        </div>
        <div>
        <span className="text-xs text-gray-500 pb-2 pl-2 block">{item.name}</span>
          <div className="bg-[#fd3abc] bg-opacity-70 text-white p-4 rounded-r-2xl rounded-tl-2xl">
            <p className="text-sm lg:text-base">{text}</p>
          </div>
          <span className="text-xs text-gray-500 pt-2 pl-2 leading-none block">{time}</span>
        </div>
      </div>
    );
  }
}

export default Message