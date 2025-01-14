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
import { LuMessagesSquare } from "react-icons/lu";

const Sidebar = ({ isOpen, onLoginClick, onSettingsClick }) => {
    const { logout, user: userData } = useContext(AuthContext);

    const menuItems = [
        {
          icons: <IoHomeOutline size={30} />,
          label: 'Home',
          route: "/",
          onClick: null
        },
        {
          icons: <IoFemale size={30} />,
          label: 'Cats',
          route: "/",
          onClick: null
        },
        {
          icons: <IoMale size={30} />,
          label: 'Dogs',
          route: "/ai-dogs",
          onClick: null
        },
        {
          icons: <GiFlowerTwirl size={30} />,
          label: 'Anime',
          route: "/ai-anime",
          onClick: null
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
          icons: <LuMessagesSquare size={30} />,
          label: 'Contact us',
          route: "/contact-us",
          onClick: null
        }
      ]
    
    // const logoutButton = {
    //   icons: <MdLogout size={30} />,
    //   label: 'Logout'
    // }

    const settingbutton = {
      icons: <CiSettings size={30} />,
      label: 'Settings',
      onClick: onSettingsClick
    }

    // const loginbutton = {
    //   icons: <FaUserCircle size={30} />,
    //   label: 'Login',
    //   onClick: onLoginClick
    // }

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
          onClick={item.onClick}
        />
      </div>
    ))}
      {userData ? (
        <>
          <div onClick={onSettingsClick} className="cursor-pointer">
            <SidebarItem isOpen={isOpen} item={settingbutton} />
          </div>
          {/* <div onClick={logout} className="cursor-pointer">
            <SidebarItem isOpen={isOpen} item={logoutButton} />
          </div> */}
          
        </>
      ) : (
        <>
        </>
      )}
      {/* <div className='flex-1'>
        <SidebarItem isOpen={isOpen} item={loginbutton} />
      </div> */}
    </ul>

    {/* Footer */}
    <div className="flex cursor-pointer hover:underline group" onClick={onSettingsClick}>
      <div className='flex items-center'>
      {userData?.image_url ? (
        <div className='block w-12'>
          <img
              src={userData.image_url}
              className="flex w-12 h-12 aspect-square rounded-full object-cover"
              alt="Profile"
          />
        </div>
      ) : (
        <></>
      )}
      </div>

    {/* Login button */}
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
        <div>
        </div>
      )}
    </div>

    </div>
  </nav>
  )
}

export default Sidebar
