import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { MdMenuOpen } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AuthContext } from "../api/AuthContext";

const TopBar = ({ isOpen, setOpen, onLoginClick, onCreateClick }) => {
    const { user, logout } = useContext(AuthContext);
    const [activeIndex, setActiveIndex] = useState(null); // Track which div is active
    const { route } = useParams()

    const handleClick = (index) => {
        setActiveIndex(index); // Set the active div by index
    };

    // Automatically check the first 3 indexes and set activeIndex to 0 if all are null
    useEffect(() => {
        if (route === "") {
            setActiveIndex(0); // Set index 0 as active if route is empty
        } else if (route === "ai-anime") {
            setActiveIndex(2); // Set index 2 as active if route is "ai-anime"
        } else {
            setActiveIndex(1); // Set index 1 as active for all other routes
        }
    }, [route]); // Depend on route to trigger when it changes
    


  return (
    <div>
        <div className="fixed top-0 left-0 w-full bg-[#121212] z-50">
            <nav className="flex-1 bg-[#121212] border-b border-[#FF6FCF]">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-between">
                    <div className='flex flex-row sm:gap-12 items-center justify-evenly'>

                        <div className='flex flex-row items-center justify-center'>
                            {/* <MdMenuOpen size={30} className={`text-[#FF6FCF] mx-0 hover:text-opacity-70 duration-300 mr-2 cursor-pointer ${!isOpen ? 'rotate-180' : ''}`} onClick={() => setOpen(!isOpen)} /> */}
                            <Link className="flex flex-shrink-0  items-center mr-1 px-1" to="/">
                                <div className="flex items-center justify-center group">
                                    <span className="text-white text-xl mm:text-2xl sm:text-3xl font-bold group-hover:text-opacity-70">Sweet</span>
                                    <span className="text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold group-hover:text-opacity-70">Aura</span>
                                    <span className="text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold group-hover:text-opacity-70">.ai</span>
                                </div>
                            </Link>
                        </div>

                        <div className='flex flex-row items-center justify-center'>
                        <Link to={"/"}>
                            <div
                                onClick={() => handleClick(0)} // Set index 0 as active
                                className={`hidden ml:block py-5 px-3 md:px-4 group cursor-pointer ${
                                    activeIndex === 0 ? "border-b-3 border-[#FF6FCF]" : ""
                                }`}
                            >
                                <h1
                                    className={`text-[#FF6FCF]  ${
                                        activeIndex === 0 ? "font-bold" : "group-hover:font-bold font-semibold"
                                    }`}
                                >
                                    Female
                                </h1>
                            </div>
                        </Link>

                        <Link to={"/ai-dogs"}>
                            <div
                                onClick={() => handleClick(1)} // Set index 0 as active
                                className={`hidden ml:block py-5 px-3 md:px-4 group cursor-pointer ${
                                    activeIndex === 1 ? "border-b-3 border-[#FF6FCF]" : ""
                                }`}
                            >
                                <h1
                                    className={`text-[#FF6FCF]  ${
                                        activeIndex === 1 ? "font-bold" : "group-hover:font-bold font-semibold"
                                    }`}
                                >
                                    Male
                                </h1>
                            </div>
                        </Link>

                        <Link to={"/ai-anime"}>
                            <div
                                onClick={() => handleClick(2)} // Set index 0 as active
                                className={`hidden ml:block py-5 px-3 md:px-4 group cursor-pointer ${
                                    activeIndex === 2 ? "border-b-3 border-[#FF6FCF]" : ""
                                }`}
                            >
                                <h1
                                    className={`text-[#FF6FCF]  ${
                                        activeIndex === 2 ? "font-bold" : "group-hover:font-bold font-semibold"
                                    }`}
                                >
                                    Anime
                                </h1>
                            </div>
                        </Link>
                        </div>

                    </div>
                    <div className="ml-auto">
                        <div className="flex space-x-2 py-2 px-4">
                            {!user ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <div className="hidden ml:block px-2 group">
                                        <button
                                        className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800/80 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                                        onClick={onCreateClick}
                                        >
                                        <span
                                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-[#FF6FCF]/50 to-[#FF6FCF] p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        ></span>
                                        <span className="relative z-10 block px-4 py-2 rounded-xl bg-gray-800/80">
                                            <div className="relative z-10 flex items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:translate-x-1"
                                                >Join!</span>
                                            <svg
                                                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                                data-slot="icon"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                clipRule="evenodd"
                                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                fillRule="evenodd"
                                                ></path>
                                            </svg>
                                            </div>
                                        </span>
                                        </button>
                                    </div>
                                <div>
                                <button
                                onClick={onLoginClick}
                                type="submit"
                                className="flex justify-center gap-2 text-md text-white items-center mx-auto shadow-xl sm:text-lg bg-gray-800/80 backdrop-blur-md lg:font-semibold isolation-auto  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FF6FCF] hover:text-[#212121] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-2 py-1 sm:px-3 sm:py-1 overflow-hidden rounded-full group"
                                >
                                Login
                                    <svg
                                        className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-[#212121] text-[#212121] ease-linear duration-300 rounded-full border border-gray-500 group-hover:border-none p-2 rotate-45"
                                        viewBox="0 0 16 19"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                        className="fill-gray-300 group-hover:fill-gray-300 "
                                        ></path>
                                    </svg>
                                </button>
                                </div>
                                </div>
                            ) : (
                                <button
                                onClick={logout}
                                type="submit"
                                className="flex justify-center gap-2 text-white items-center mx-auto shadow-xl text-lg bg-[#212121] backdrop-blur-md lg:font-semibold isolation-auto border-gray-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FF6FCF] hover:text-[#212121] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-1 overflow-hidden border-2 rounded-full group"
                                >
                                Logout
                                    <svg
                                        className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-[#212121] text-[#212121] ease-linear duration-300 rounded-full border border-gray-50 group-hover:border-none p-2 rotate-45"
                                        viewBox="0 0 16 19"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                        className="fill-gray-50 group-hover:fill-gray-50"
                                        ></path>
                                    </svg>
                                </button>
                            )}
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