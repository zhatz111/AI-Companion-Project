import React, { useContext } from 'react'
import Button from './Button'
import { MdMenuOpen } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AuthContext } from "../api/AuthContext";

const TopBar = ({ isOpen, setOpen, onLoginClick, onCreateClick }) => {
    // const { user, logout } = useContext(AuthContext);
  return (
    <div>
        <div className="fixed top-0 left-0 w-full bg-[#121212] z-50">
            <nav className="flex-1 bg-[#121212] border-b border-[#FF6FCF]">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center">
                    <MdMenuOpen size={34} className={`text-[#FF6FCF] mx-0 hover:text-opacity-70 duration-300 mr-2 cursor-pointer ${!isOpen ? 'rotate-180' : ''}`} onClick={() => setOpen(!isOpen)} />
                    <Link className="flex flex-shrink-0  items-center mr-1 px-1" to="/">
                        <div className="group hover:text-opacity-70">
                            <span className="text-white text-xl mm:text-2xl sm:text-3xl font-bold group-hover:text-opacity-70">Sweet</span>
                            <span className="text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold group-hover:text-opacity-70">Aura</span>
                            <span className="text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold group-hover:text-opacity-70">.ai</span>
                        </div>
                    </Link>
                    <div className="ml-auto">
                        <div className="flex space-x-2 py-2 px-4">
                            <Button label="Create Account" className="hidden sm:block" onClick={onCreateClick} />
                            {/* <Button label="Join" className="block sm:hidden" onClick={onCreateClick} /> */}
                            <Button label="Login" className="block" onClick={onLoginClick} />
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