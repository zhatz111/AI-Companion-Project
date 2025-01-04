import React, { useContext } from 'react'
import { AuthContext } from "../api/AuthContext";

const Message = ({ item, text, time, sender }) => {
  const { user } = useContext(AuthContext);
  const isSender = user?.username && sender === user.username;
  if (isSender) {
    return (
      <div className="flex w-full mt-2 space-x-3 sm:max-w-xs md:max-w-md ml-auto justify-end">
        <div className="flex flex-col">
          <div className="bg-[#303030] text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-mm md:text-sm lg:text-base">{text}</p>
          </div>
          <div className="flex p-1.5">
            <span className="text-xs text-gray-500 ml-auto leading-none">{time}</span>
          </div>
        </div>
        <div className="flex-shrink-0 h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden bg-gray-300">
          <img src={item.alt_img_path} alt="Sender's Avatar" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full mt-2 space-x-3 max-w-md">
        <div className="flex-shrink-0 h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden bg-gray-300">
          <img src={item.alt_img_path} alt="Receiver's Avatar" />
        </div>
        <div>
          <div className="bg-[#fd3abc] text-white p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-mm md:text-sm lg:text-base">{text}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{time}</span>
        </div>
      </div>
    );
  }
}

export default Message