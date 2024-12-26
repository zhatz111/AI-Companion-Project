import React from 'react'

const Message = ({ item, text, time, sender }) => {
  const isSender = sender === "sender";
  if (isSender) {
    return (
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-[#303030] text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-md">{text}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{time}</span>
        </div>
        <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-300">
          <img src={item.alt_img_path} alt="Sender's Avatar" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-300">
          <img src={item.alt_img_path} alt="Receiver's Avatar" />
        </div>
        <div>
          <div className="bg-[#fd3abc] text-white p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-md">{text}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{time}</span>
        </div>
      </div>
    );
  }
}

export default Message