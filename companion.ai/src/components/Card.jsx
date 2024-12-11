import React from 'react'

const Card = ({ item }) => {
    const description = item.description
  return (
    <div className="w-full bg-[#212121] rounded-xl shadow-lg relative">
        <figure className="relative max-w-sm group">
            <a href="#">
            <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-lg shadow-lg transition-all cursor-pointer filter bg-opacity-30 brightness-[50%] duration-500 group-hover:filter-none" src={item.alt_img_path} alt=""></img>
            </a>
            <a className='absolute top-3 right-3 border-2 sm:border-3 rounded-full border-[#FF6FCF] transition hover:bg-[#FF6FCF] py-2 px-2 group/message' href={`/${item.id}`}>
            <svg className="h-3 w-3 sm:h-5 sm:w-5 flex-no-shrink stroke-[#FF6FCF] transition duration-100 group-hover/message:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </a>
            <figcaption className="absolute left-6 right-6 bottom-6 grid gap-2">
                <p className="text-sm sm:text-2xl 2xl:text-3xl font-bold text-white text-left">{item.name}</p>
                <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left">{`${item.age} years old`}</p>
                <p className="hidden sm:block text-xs sm:text-md 2xl:text-lg text-gray-300 text-left">{description.slice(0,90)} ...</p>
                <p className="block sm:hidden text-xs sm:text-md 2xl:text-lg text-gray-300 text-left">{description.slice(0,30)} ...</p>
            </figcaption>
        </figure>
    </div>
  )
}

export default Card