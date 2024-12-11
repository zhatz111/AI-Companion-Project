import React from 'react'
import SidebarItem from './SidebarItem'
import items from "../data/sidebar_items.json"

// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const menuItems = [
        {
          icons: <IoHomeOutline size={30} />,
          label: 'Home'
        },
        {
          icons: <FaProductHunt size={30} />,
          label: 'Products'
        },
        {
          icons: <MdOutlineDashboard size={30} />,
          label: 'Dashboard'
        },
        {
          icons: <CiSettings size={30} />,
          label: 'Setting'
        },
        {
          icons: <IoLogoBuffer size={30} />,
          label: 'Log'
        },
        {
          icons: <TbReportSearch size={30} />,
          label: 'Report'
        }
      ]
  return (
    // <div>
    //     <aside
    //         id="default-sidebar"
    //         className={`fixed sm:visible border-solid border-r border-[#FF6FCF] top-16 left-0 z-40 w-56 h-screen duration-300 ease-in-out transition-transform ${
    //         isOpen ? 'translate-x-0' : '-translate-x-full'
    //         }`}
    //         aria-label="Sidebar"
    //     >
    //         <div className="h-full px-3 py-4 overflow-y-auto bg-[#121212] border-b border-[#FF6FCF]">
    //         <ul className="space-y-2 font-medium">
    //             {items.map((sidebar_item) => (
    //                 <SidebarItem key={ sidebar_item.id } item={ sidebar_item }/>
    //             ))}
    //         </ul>
    //         </div>
    //     </aside>
    // </div>

    <nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-[#121212] text-white ${isOpen ? 'w-60' : 'w-16'}`}>


        {/* Body */}

        <ul className='flex-1'>
        {
            menuItems.map((item, index) => {
            return (
                <li key={index} className='px-2 py-2 my-2 hover:bg-[#FF6FCF] rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                <div>{item.icons}</div>
                <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md
                w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}>{item.label}</p>
                </li>
            )
            })
        }
        </ul>
        {/* footer */}
        <div className='flex items-center gap-2 px-3 py-2'>
        <div><FaUserCircle size={30} /></div>
        <div className={`leading-5 ${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
            <p>Saheb</p>
            <span className='text-xs'>saheb@gmail.com</span>

        </div>
        </div>


    </nav>
  )
}

export default Sidebar