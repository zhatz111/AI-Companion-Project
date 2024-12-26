import React from 'react'
import items from "../src/data/sidebar_items.json"
import SmallSidebarItem from './SmallSidebarItem'

const SmallSidebar = ({ isOpen }) => {
  return (
    <div>
        <aside
            id="default-sidebar"
            className={`fixed invisible sm:visible border-solid border-r border-[#FF6FCF] top-16 left-0 z-40 w-30 h-full duration-300 ease-in-out transition-transform ${
            isOpen ? '-translate-x-full' : 'translate-x-0'
            }`}
            aria-label="Sidebar"
        >
            <div className="h-full px-6 py-6 overflow-y-auto bg-[#121212] border-b border-[#FF6FCF] items-center justify-center">
            <ul className="space-y-2 font-medium">
                {items.map((sidebar_item) => (
                    <SmallSidebarItem key={ sidebar_item.id } item={ sidebar_item }/>
                ))}
            </ul>
            </div>
        </aside>
    </div>
  )
}

export default SmallSidebar