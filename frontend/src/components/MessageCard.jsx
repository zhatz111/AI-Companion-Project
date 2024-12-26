import React from 'react'
import { Link } from 'react-router-dom';

const MessageCard = ({ item }) => {
    const description = item.description
  return (
    <figure className="relative max-w-sm group">
        <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-3xl p-5" src={item.alt_img_path} alt=""></img>
    </figure>
  )
}

export default MessageCard