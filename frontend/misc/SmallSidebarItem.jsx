import React from 'react'

const SmallSidebarItem = ({ item }) => {
  return (
    <div>
        <a
            href="#"
            className="flex justify-center w-16 bg-[#212121] p-2 text-white rounded-lg border-solid border-2 border-gray-500 hover:bg-[#121212] group"
        >
            <svg
            className="h-8 w-8 text-white transition duration-75 group-hover:text-[#FF6FCF]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox={item.viewbox}
            >
            {item.path.map((d_path, index) => (
                <path key={index} d={d_path} />
            ))}
            </svg>
        </a>
    </div>
  )
}

export default SmallSidebarItem