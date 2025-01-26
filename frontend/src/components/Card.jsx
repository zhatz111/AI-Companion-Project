import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({ item, onClick }) => {
    const description = item.description;
    const itemId = item.name.replace(/ /g, '-').toLowerCase();
    const firstName = item.name.split(" ")[0]
  return (
    <div className="p-4" onClick={onClick}>
        <figure className="relative group">
            <Link to={`/chat/${itemId}`} state={ item }>
            <div className="relative w-full aspect-[10/15] group">
              <img
                className="absolute rounded-3xl inset-0 w-full h-full object-cover cursor-pointer duration-500 transition-opacity ease-in-out group-hover:opacity-0"
                src={item.alt_img_path}
                alt=""
              />
              <img
                className="absolute rounded-3xl inset-0 w-full h-full object-cover duration-500 transition-opacity ease-in-out opacity-0 group-hover:opacity-100"
                src={item.img_path}
                alt=""
              />
              <div className="absolute rounded-3xl inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
            </div>
            <figcaption className="absolute left-4 right-4 sm:left-6 sm:right-6 bottom-6 flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="text-sm text-left hidden ml:block border bg-[#FF6FCF]/60 text-nowrap hover:bg-[#FF6FCF] rounded-full px-2 text-white">{item.body_type}</div>
                <div className="text-sm text-left hidden ml:block border bg-[#FF6FCF]/60 text-nowrap hover:bg-[#FF6FCF] rounded-full px-2 text-white">{item.race}</div>
              </div>
              <div className="flex gap-2">
                <span className="text-base text-left md:text-xl font-bold text-white">{firstName}</span>
                <span className="text-base text-left md:text-xl font-bold text-gray-300">{item.age}</span>
              </div>
              <p className="text-sm hidden md:block md:text-base text-left text-gray-400">{description.slice(0, 50)} ...</p>
            </figcaption>
            </Link>
        </figure>
    </div>
  )
}

export default Card