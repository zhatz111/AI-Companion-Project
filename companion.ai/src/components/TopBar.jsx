import React from 'react'
import HamburgerMenu from './HamburgerMenu'
import Button from './Button'
import MdMenuOpen from "react-icons/md";

const TopBar = ({ isOpen, setOpen }) => {
  return (
    <div>
        <div className="fixed top-0 left-0 w-full bg-[#121212] z-50">
            <nav className="flex-1 bg-[#121212] border-b border-[#FF6FCF]">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center">
                    {/* <MdMenuOpen size={34} className={`text-[#FF6FCF] duration-500 cursor-pointer ${!isOpen && ' rotate-180'}`} onClick={() => setOpen(!isOpen)} /> */}
                    {/* <HamburgerMenu isOpen={isOpen} setOpen={setOpen} /> */}
                    <a className="flex flex-shrink-0 items-center mr-1 px-1" href="/index.html">
                    <span className="text-white text-xl mm:text-2xl sm:text-3xl font-bold">Sweet</span>
                    <span className="text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold">Aura</span>
                    <span className="text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold">.ai</span>
                    </a>
                    <div className="ml-auto">
                    <div className="flex space-x-2 py-2 px-1">
                        <Button href="/index.html" label="Create Account" classes="hidden sm:block" />
                        <Button href="/index.html" label="Join" classes="block sm:hidden" />
                        <Button href="/jobs.html" label="Login" classes="block" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </nav>
        </div>
    </div>
  )
}

export default TopBar