import React, { useContext, useEffect, useState } from 'react'
import SidebarItem from './SidebarItem'
import { AuthContext } from "../api/AuthContext";

// icons
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { IoFemale } from "react-icons/io5";
import { IoMale } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { GiFlowerTwirl } from "react-icons/gi";
import { FaPerson } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, onLoginClick }) => {
    const { logout, user: userData } = useContext(AuthContext);

    const menuItems = [
        {
          icons: <IoHomeOutline size={30} />,
          label: 'Home',
          route: "/"
        },
        {
          icons: <IoFemale size={30} />,
          label: 'Cats',
          route: "/"
        },
        {
          icons: <IoMale size={30} />,
          label: 'Dogs',
          route: "/ai-dogs"
        },
        {
          icons: <GiFlowerTwirl size={30} />,
          label: 'Anime',
          route: "/ai-anime"
        },
        // {
        //   icons: <IoCreateOutline size={30} />,
        //   label: 'Create'
        // },
        // {
        //   icons: <FaPerson size={30} />,
        //   label: 'My Character'
        // },
        {
          icons: <CiSettings size={30} />,
          label: 'Settings',
          route: "/"
        },
        {
          icons: <FaPhoneSquareAlt size={30} />,
          label: 'Contact us',
          route: "/contact-us"
        }
      ]
    
    const logoutButton = {
      icons: <MdLogout size={30} />,
      label: 'Logout'
    }

  return (
    <nav
    className={`fixed top-0 left-0 shadow-md border-r border-[#FF6FCF] pt-20 bottom-0 z-40 p-6 flex flex-col transition-width duration-500 ease-in-out bg-[#121212] text-white ${
      isOpen ? 'w-60' : 'w-24'
    }`}
  >

    {/* Body */}
    <ul className="flex-1">
    {menuItems.map((item, index) => (
      <div key={index} className="cursor-pointer">
        <SidebarItem 
          isOpen={isOpen} 
          item={item} 
          index={index} 
          route={item.route} // Assuming `link` is a property in the `item` object
        />
      </div>
    ))}

      {userData ? (
        <div onClick={logout} className="cursor-pointer">
          <SidebarItem isOpen={isOpen} item={logoutButton} />
        </div>
      ) : (
        <></>
      )}
    </ul>


    {/* Footer */}
    <div className="flex cursor-pointer hover:underline items-center gap-2 px-3 py-2 group" onClick={onLoginClick}>
      <div>
        <FaUserCircle size={30} />
      </div>
      <div
        className={`${!isOpen && 'translate-x-8'} duration-500 overflow-hidden`}>
        {userData ? (
          <>
            <p className="px-2">{userData.username}</p>
            <span className="text-xs">
              <p className="px-2">{userData.email}</p>
            </span>
          </>
        ) : (
          <>
            <button className="group-hover:underline px-2">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
  )
}

export default Sidebar