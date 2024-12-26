import React from 'react'

const SidebarItem = ({ item }) => {

  return (
    <div>
        <li>
        <a
            href={`/${item.id}`}
            className="flex items-center bg-[#212121] p-2 text-white rounded-lg border-solid border-2 border-gray-500 hover:bg-[#121212] group"
        >
            {/* {icons[icon]} */}
            <svg className="w-5 h-5 text-white transition duration-75 group-hover:text-[#FF6FCF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox={item.viewbox}>
                {item.path.map((d_path, index) => (
                    <path key={index} d={d_path} />
                ))}
            </svg>
            <span className="ms-3">{item.name}</span>
        </a>
        </li>
    </div>
  )
}

export default SidebarItem