import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ isOpen, item, route }) => {
  return (
    <li className="px-2 py-2 my-2 hover:bg-[#FF6FCF] whitespace-nowrap rounded-xl duration-300 cursor-pointer flex gap-4 items-center group">
      <Link to={route} className="flex items-center gap-4 w-full">
        <div>{item.icons}</div>
        <p
          className={`${!isOpen && 'translate-x-8'} duration-500 overflow-hidden`}
        >
          {item.label}
        </p>
        <p
          className={`${isOpen && 'hidden'} absolute shadow-md rounded-md w-0 p-0 text-black bg-white overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-20`}
        >
          {item.label}
        </p>
      </Link>
    </li>
  );
};

export default SidebarItem;
