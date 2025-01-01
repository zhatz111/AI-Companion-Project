import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    const description = item.description;
    const itemId = item.name.replace(/ /g, '-').toLowerCase();
    const firstName = item.name.split(" ")[0]
  return (
    <div className="w-full bg-[#212121] rounded-2xl shadow-xl relative">
        <figure className="relative max-w-sm group">
            <Link to={`/chat/${itemId}`} state={ item }>
              <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-2xl shadow-xl transition-all cursor-pointer filter bg-opacity-30 brightness-[50%] duration-500 group-hover:filter-none" src={item.alt_img_path} alt=""></img>
            </Link>
            {/* <Link to={`/chat/${itemId}`} state={ item } className='absolute top-3 right-3 border-2 sm:border-3 rounded-full border-[#FF6FCF] transition hover:bg-[#FF6FCF] py-2 px-2 group/message'>
              <svg className="h-3 w-3 sm:h-5 sm:w-5 flex-no-shrink stroke-[#FF6FCF] transition duration-100 group-hover/message:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </Link> */}
            <figcaption className="absolute left-6 right-6 bottom-6 flex flex-col gap-2">
                <div className="flex gap-2 justify-start">
                    <span className="text-sm sm:text-2xl 2xl:text-3xl font-bold text-white text-left">{firstName}</span>
                    <span className="text-sm sm:text-2xl 2xl:text-3xl font-bold text-gray-300 text-left">{item.age}</span>
                </div>
                <p className="hidden sm:block text-xs sm:text-lg 2xl:text-lg text-gray-300 text-left">{description.slice(0,90)} ...</p>
                <p className="block sm:hidden text-xs sm:text-lg 2xl:text-lg text-gray-300 text-left">{description.slice(0,30)} ...</p>
            </figcaption>

        </figure>
    </div>
  )
}

export default Card