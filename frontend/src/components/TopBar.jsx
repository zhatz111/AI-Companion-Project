import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from "../api/AuthContext";
import { CharacterContext } from '../api/CharacterContext';
import { ConversationContext } from '../api/ConversationContext';

export function Convos(props) {
    return (
    <div className='flex flex-row items-center justify-start'>
        <svg
            className='flex w-4 h-4'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            {...props}
        >
            <g fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3.586l-3.707 3.707A1 1 0 0 1 6 17v-3H5a3 3 0 0 1-3-3V5zm20 4v6c0 1-.6 3-3 3h-1v3c0 .333-.2 1-1 1c-.203 0-.368-.043-.5-.113L12.613 18H9l3-3h3c1.333 0 4-.8 4-4V6c1 0 3 .6 3 3z"
                fill="currentColor"
            ></path>
            </g>
        </svg>
        <p className='flex px-2'>Convos</p>
    </div>
    )
  }

export function Profile(props) {
    return (
    <div className='flex flex-row items-center justify-start'>
        <svg
            className='flex w-4 h-4'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            {...props}
            >
            <path
                fill="currentColor"
                d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3m6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1z"
            ></path>
        </svg>
        <p className='flex px-2'>Profile</p>
    </div>
    )
  }

export function Chat(props) {
    return (
    <div className='flex flex-row items-center justify-start'>
        <svg
            className='flex w-4 h-4'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            {...props}
            >
            <path
                fill="currentColor"
                d="M22 6.98V16c0 1.1-.9 2-2 2H6l-4 4V4c0-1.1.9-2 2-2h10.1A5.002 5.002 0 0 0 19 8c1.13 0 2.16-.39 3-1.02M16 3c0 1.66 1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3"
            ></path>
        </svg>
        <p className='flex px-2'>Chat</p>
    </div>
    )
  }

const TopBar = ({ onLoginClick, onCreateClick }) => {
    const { user, logout } = useContext(AuthContext);
    const [activeIndex, setActiveIndex] = useState(null); // Track which div is active
    const { route } = useParams()
    const { currentCharacter, setCurrentCharacter } = useContext(CharacterContext);
    const { activeView, setActiveView } = useContext(ConversationContext);

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

    // State to track which dropdown is open and its selected value
    const options = [
        { component: <Chat />, keyword: "chat" },
        { component: <Convos />, keyword: "convos" },
        { component: <Profile />, keyword: "profile" },
      ];
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleSelect = (identity, keyword) => {
        console.log(identity, keyword); // Debugging: Logs the selected identity and keyword
        setActiveView(keyword);
      };

    // Toggle dropdown function
    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    };


  return (
    <div>
        <div className="fixed top-0 left-0 w-full bg-[#121212] z-50">
            <nav className="flex-1 bg-[#121212] border-0 border-[#FF6FCF]">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-between">
                    <div className='flex flex-row sm:gap-12 items-center justify-evenly'>

                        <div className='flex flex-row items-center justify-center'>
                            {/* <MdMenuOpen size={30} className={`text-[#FF6FCF] mx-0 hover:text-opacity-70 duration-300 mr-2 cursor-pointer ${!isOpen ? 'rotate-180' : ''}`} onClick={() => setOpen(!isOpen)} /> */}
                            <Link className="flex flex-shrink-0  items-center mr-1 px-1" to="/">
                                <div className="flex items-center justify-center group">
                                    <span className="text-white text-3xl sm:text-3xl font-bold group-hover:text-opacity-70">Sweet</span>
                                    <span className="text-[#FF6FCF] text-3xl sm:text-3xl font-bold group-hover:text-opacity-70">Aura</span>
                                    <span className="text-[#FF6FCF] text-3xl sm:text-3xl font-bold group-hover:text-opacity-70">.ai</span>
                                </div>
                            </Link>
                        </div>

                        {/* <div className='flex flex-row items-center justify-center'>
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
                        </div> */}

                    </div>
                    <div className="ml-auto">
                        <div className="flex space-x-2 py-2 px-4">
                            {!user ? (
                                <div className='flex items-center justify-center gap-0'>

                                    {/* Join Button */}
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
                                                className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
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

                                    {/* Login Button */}
                                    <div className="block px-2 group">
                                        <button
                                        className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800/80 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                                        onClick={onLoginClick}
                                        >
                                        <span
                                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-[#FF6FCF]/50 to-[#FF6FCF] p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        ></span>
                                        <span className="relative z-10 block px-4 py-2 rounded-xl bg-gray-800/80">
                                            <div className="relative z-10 flex items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:translate-x-1"
                                                >Login</span>
                                            <svg
                                                className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
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

                                    {/* <div>
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
                                    </div> */}
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

            {/* Top Bar Icons below lg width*/}
            <div className='fixed 2xl:h-full w-full 2xl:w-0 py-3 2xl:py-0 z-50 2xl:z-0 2xl:mx-6 2xl:flex 2xl:items-center 2xl:justify-center2xl:mx-6'>
                <div className='flex text-center justify-center 2xl:text-center 2xl:justify-start'>
                    <div className='flex bg-black 2xl:flex-col py-4 px-2 2xl:px-2 rounded-full border-[#FF6FCF] border'>

                        {/* home button */}
                        <Link to={"/"} className='flex items-center justify-center group'>
                        <button
                            className="text-gray-500 hover:text-gray-300 mx-3 2xl:mx-1 2xl:my-1 2xl:py-1 transition-transform duration-200 ease-in-out hover:scale-110 outline-none rounded-full"
                        >
                            <svg className="w-6 h-6 2xl:w-9 2xl:h-9 text-[#FF6FCF] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                            </svg>
                        </button>
                        <p
                        className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-16 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                        >
                        Home
                        </p>
                        </Link>

                        {/* Female Button */}
                        <Link to={"/"} className='flex items-center justify-center group'>
                        <button className='2xl:py-1 mx-3 2xl:mx-1 2xl:my-1 2xl:justify-center'>
                            <svg
                            className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 text-[#FF6FCF]  transition-transform duration-200 ease-in-out hover:-translate-y-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 22"
                            width="1em"
                            height="1em"
                            >
                            <path
                                fill="currentColor"
                                d="M14.041 16.683a15 15 0 0 1-.035-.72c2.549-.261 4.338-.872 4.338-1.585c-.007 0-.006-.03-.006-.041C16.432 12.619 19.99.417 13.367.663a3.34 3.34 0 0 0-2.196-.664h.008C2.208.677 6.175 12.202 4.13 14.377h-.004c.008.698 1.736 1.298 4.211 1.566c-.007.17-.022.381-.054.734C7.256 19.447.321 18.671.001 24h22.294c-.319-5.33-7.225-4.554-8.253-7.317z"
                            ></path>
                            </svg>
                        </button>
                        <p
                        className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-16 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                        >
                        Female
                        </p>
                        </Link>

                        {/* Male Button */}
                        <Link to={"/ai-dogs"} className='flex items-center justify-center group'>
                        <button className='2xl:py-1 mx-3 2xl:my-3 2xl:justify-center '>
                            <svg
                            className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 text-blue-500 transition-transform duration-200 ease-in-out hover:-translate-y-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 22"
                            width="1em"
                            height="1em"
                            >
                            <path
                                fill="currentColor"
                                d="M14.145 16.629a24 24 0 0 1-.052-2.525l-.001.037a4.85 4.85 0 0 0 1.333-2.868l.002-.021c.339-.028.874-.358 1.03-1.666a1.22 1.22 0 0 0-.455-1.218l-.003-.002c.552-1.66 1.698-6.796-2.121-7.326C13.485.35 12.479 0 11.171 0c-5.233.096-5.864 3.951-4.72 8.366a1.22 1.22 0 0 0-.455 1.229l-.001-.008c.16 1.306.691 1.638 1.03 1.666a4.86 4.86 0 0 0 1.374 2.888a25 25 0 0 1-.058 2.569l.005-.081C7.308 19.413.32 18.631 0 24h22.458c-.322-5.369-7.278-4.587-8.314-7.371z"
                            ></path>
                            </svg>
                        </button>
                        <p
                        className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-16 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                        >
                        Male
                        </p>
                        </Link>

                        {/* Anime Button */}
                        <Link to={"/ai-anime"} className='flex items-center justify-center group'>
                        <button className='2xl:py-1 mx-3 2xl:my-3 2xl:justify-center '>
                        <svg
                        className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 transition-all duration-200 ease-in-out hover:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        width="1em"
                        height="1em"
                        >
                        <g fill="#9d9e9f">
                            <path d="M62.33 33.34a6.62 6.62 0 0 0-2.676-5.322a6.65 6.65 0 0 0 .737-6.324a6.64 6.64 0 0 0-5.249-4.094a6.637 6.637 0 0 0-7.288-7.739a6.63 6.63 0 0 0-3.912-4.794a6.64 6.64 0 0 0-6.648.849a6.64 6.64 0 0 0-5.805-3.419A6.62 6.62 0 0 0 26.2 5.132a6.65 6.65 0 0 0-5.952-.5a6.66 6.66 0 0 0-4.1 5.294c-2.33-.806-5.02-.289-6.879 1.575a6.65 6.65 0 0 0-1.823 5.972a6.63 6.63 0 0 0-4.432 3.822a6.64 6.64 0 0 0 .502 6.153a6.64 6.64 0 0 0-.381 11.495c-1.103 1.75-1.389 3.982-.553 6.04a6.63 6.63 0 0 0 4.622 3.973a6.64 6.64 0 0 0 1.835 5.926a6.65 6.65 0 0 0 6.06 1.806a6.63 6.63 0 0 0 3.935 4.923c2.113.9 4.426.622 6.216-.536a6.63 6.63 0 0 0 5.598 3.075a6.63 6.63 0 0 0 5.487-2.896a6.635 6.635 0 0 0 10.47-4.353a6.64 6.64 0 0 0 6.264-1.752a6.65 6.65 0 0 0 1.85-5.81a6.65 6.65 0 0 0 5.05-3.957a6.63 6.63 0 0 0-.704-6.442a6.65 6.65 0 0 0 3.072-5.604"></path>
                            <path d="M23.08 18.568c0-4.827 1.039-9.408 2.889-13.549a6.62 6.62 0 0 0-5.729-.383a6.66 6.66 0 0 0-4.1 5.294c-2.33-.806-5.02-.289-6.879 1.575a6.65 6.65 0 0 0-1.823 5.972a6.63 6.63 0 0 0-4.432 3.822a6.64 6.64 0 0 0 .502 6.153a6.64 6.64 0 0 0-3.512 5.86a6.64 6.64 0 0 0 3.131 5.636c-1.103 1.75-1.389 3.982-.553 6.04a6.63 6.63 0 0 0 4.622 3.973a6.64 6.64 0 0 0 1.835 5.926a6.65 6.65 0 0 0 6.06 1.806a6.63 6.63 0 0 0 3.935 4.923c2.113.9 4.426.622 6.216-.536a6.63 6.63 0 0 0 5.598 3.075a6.63 6.63 0 0 0 5.487-2.896a6.635 6.635 0 0 0 10.47-4.353a6.64 6.64 0 0 0 6.264-1.752a6.6 6.6 0 0 0 1.803-3.38c-17.681-.768-31.782-15.339-31.782-33.21"></path>
                        </g>
                        <path
                            fill="#e6e7e8"
                            d="M62.33 30.845a6.62 6.62 0 0 0-2.676-5.324a6.65 6.65 0 0 0 .737-6.324a6.63 6.63 0 0 0-5.249-4.092a6.65 6.65 0 0 0-1.843-5.841a6.66 6.66 0 0 0-5.445-1.901a6.64 6.64 0 0 0-3.912-4.796a6.65 6.65 0 0 0-6.648.849A6.65 6.65 0 0 0 31.489 0A6.62 6.62 0 0 0 26.2 2.635a6.62 6.62 0 0 0-5.952-.499a6.66 6.66 0 0 0-4.1 5.293a6.638 6.638 0 0 0-8.702 7.546a6.63 6.63 0 0 0-4.432 3.822a6.64 6.64 0 0 0 .502 6.151a6.65 6.65 0 0 0-3.512 5.864a6.63 6.63 0 0 0 3.131 5.633a6.64 6.64 0 0 0-.553 6.05a6.64 6.64 0 0 0 4.622 3.973a6.65 6.65 0 0 0 7.895 7.73a6.64 6.64 0 0 0 10.151 4.386a6.64 6.64 0 0 0 11.085.18a6.62 6.62 0 0 0 6.394.792a6.64 6.64 0 0 0 4.076-5.142a6.65 6.65 0 0 0 6.264-1.757a6.64 6.64 0 0 0 1.85-5.808a6.65 6.65 0 0 0 5.05-3.954a6.64 6.64 0 0 0-.704-6.447a6.64 6.64 0 0 0 3.072-5.599"
                        ></path>
                        <path
                            fill="#cccbcb"
                            d="M23.08 16.07c0-4.828 1.039-9.41 2.889-13.555c-1.696-.946-3.785-1.162-5.729-.377a6.66 6.66 0 0 0-4.1 5.293a6.638 6.638 0 0 0-8.702 7.546a6.63 6.63 0 0 0-4.432 3.822a6.64 6.64 0 0 0 .502 6.151a6.65 6.65 0 0 0-3.512 5.864a6.63 6.63 0 0 0 3.131 5.633a6.64 6.64 0 0 0-.553 6.05a6.64 6.64 0 0 0 4.622 3.973a6.65 6.65 0 0 0 7.895 7.73a6.64 6.64 0 0 0 10.151 4.386a6.64 6.64 0 0 0 11.085.18a6.62 6.62 0 0 0 6.394.792a6.64 6.64 0 0 0 4.076-5.142a6.65 6.65 0 0 0 6.264-1.757a6.6 6.6 0 0 0 1.803-3.376c-17.681-.769-31.782-15.339-31.782-33.21"
                        ></path>
                        <path
                            fill="#ec297b"
                            d="M48.902 20.526c-7.696-9.338-21.351-12.563-31.23-4.673c-8.275 6.611-6.595 20.413-.54 27.855c6.552 8.05 20.21 7.519 27.14.279c3.776-3.945 4.533-10.179 2.438-15.11c-2.056-4.867-6.444-7.789-11.612-8.383c-5.328-.614-11.194.688-13.189 6.208c-2.427 6.707 4.941 11.857 10.898 10.234c2.993-.814 1.721-5.456-1.281-4.642c-4.886 1.332-7.174-4.998-2.306-6.654c3.726-1.266 8.446-.42 11.26 2.318c3.587 3.493 3.302 9.586-.033 13.07c-3.259 3.405-9.06 4.375-13.49 3.364c-8.628-1.96-12.383-13.938-8.896-21.441c2.261-4.856 7.971-6.92 12.98-6.848c5.79.086 10.895 3.495 14.462 7.822c1.979 2.395 5.364-1.03 3.402-3.4"
                        ></path>
                        </svg>
                        </button>
                        <p
                        className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-16 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                        >
                        Anime
                        </p>
                        </Link>
                        
                        {/* Contact Us Button */}
                        <Link to={"/contact-us"} className='flex items-center justify-center group'>
                        <button className='2xl:py-1 mx-3 2xl:my-3 2xl:justify-center'>
                        <svg
                        className="w-6 h-6 md:w-7 md:h-7 2xl:w-9 2xl:h-9 text-white transition-all duration-200 ease-in-out hover:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-8 3.5v2h-2v-2zM10.5 10c0-.844.59-1.5 1.5-1.5c.523 0 .88.17 1.105.395c.225.224.395.582.395 1.105c0 .32-.081.462-.168.57c-.113.14-.251.244-.507.437l-.183.14c-.335.256-.774.615-1.11 1.178c-.343.574-.532 1.279-.532 2.175h2c0-.604.123-.94.25-1.15c.133-.223.318-.394.608-.615q.053-.042.12-.09c.255-.191.626-.468.909-.817c.382-.472.613-1.06.613-1.828c0-.977-.33-1.87-.98-2.52S12.977 6.5 12 6.5c-2.09 0-3.5 1.627-3.5 3.5z"
                            clipRule="evenodd"
                        ></path>
                        </svg>
                        </button>
                        <p
                        className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-16 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                        >
                        Contact Us
                        </p>
                        </Link>

                        {/* Dropdown for Conversations */}
                        {currentCharacter && (
                        <div className="lg:hidden relative pt-1 items-center justify-center">
                            <button
                                onClick={() => toggleDropdown('identity')}
                                className="text-gray-300 hover:text-gray-200 2xl:py-1 mx-3 2xl:my-1 2xl:justify-center transition-all duration-400 ease-in-out hover:rotate-180 rounded-full"
                                type="button"
                                >
                                <svg
                                className='w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="1em"
                                height="1em"
                              >
                                <path
                                  fill="currentColor"
                                  d="m20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z"
                                ></path>
                                </svg>
                            </button>
                                {openDropdown === 'identity' && (
                                <div className="z-10 absolute divide-y right-0 2xl:-right-16 divide-gray-100 rounded-2xl shadow w-30 bg-gray-700 ">
                                    <ul className="py-2 text-sm bg-black rounded-2xl text-gray-200 px-2 max-h-48 overflow-y-auto no-scrollbar">
                                    {options.map(({ component, keyword }) => (
                                    <li key={keyword}>
                                        <button
                                        className="block w-full h-full text-left px-4 py-2 rounded-lg hover:text-[#FF6FCF]"
                                        onClick={() => handleSelect("identity", keyword)}
                                        >
                                        {component}
                                        </button>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopBar