import React from 'react'

const MessageCard = ({ item }) => {

  return (
    <div className="flex">
        <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-xl overflow-hidden m-4" src={item.alt_img_path} alt=""></img>
    </div>
  )
}

export default MessageCard