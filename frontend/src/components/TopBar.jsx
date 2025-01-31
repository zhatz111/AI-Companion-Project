import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { AuthContext } from "../api/AuthContext";
import { EventContext } from '../api/EventContext';
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

const TopBar = ({ onLoginClick, onCreateClick, onSettingsClick }) => {
    const { user, logout } = useContext(AuthContext);
    const [activeIndex, setActiveIndex] = useState(null); // Track which div is active
    const { route } = useParams()
    const { currentCharacter, setCurrentCharacter } = useContext(CharacterContext);
    const { activeView, setActiveView } = useContext(ConversationContext);
    const { screenWidth } = useContext(EventContext);

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
                                <div className="block px-2 group">
                                    {/* Login Button */}
                                    <button
                                    className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800/80 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                                    onClick={logout}
                                    >
                                    <span
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-[#FF6FCF]/50 to-[#FF6FCF] p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    ></span>
                                    <span className="relative z-10 block px-4 py-2 rounded-xl bg-gray-800/80">
                                        <div className="relative z-10 flex items-center space-x-2">
                                        <span className="transition-all duration-500 group-hover:translate-x-1"
                                            >Logout</span>
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
                            )}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </nav>

            {/* Top Bar Icons below lg width*/}
            <div 
            className='fixed 2xl:h-full w-full 2xl:w-0 py-3 2xl:py-0 z-50 2xl:z-0 2xl:mx-16 2xl:flex 2xl:items-center 2xl:justify-center'
            onClick={() => toggleDropdown('identity')}
            >
                <div 
                className='flex text-center justify-center 2xl:text-center 2xl:justify-start'>
                    <div 
                    className='flex bg-black 2xl:flex-col p-2 2xl:p-1 rounded-2xl shadow-xl border border-gray-600'
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        
                        {/* Main Top bar icons */}
                        <div className='flex flex-col'>
                            {/* topbar icons set 1 */}
                            <div className='flex 2xl:flex-col'>
                                {/* home button */}
                                <Link to={"/"} className='flex items-center justify-center group'>
                                <button
                                    className="py-2 px-3 2xl:py-3 2xl:px-2 transition-transform duration-200 ease-in-out hover:scale-110 outline-none rounded-lg"
                                >
                                    <svg className="w-6 h-6 2xl:w-8 2xl:h-8 text-white dark:text-white hover:text-[#FF6FCF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                                    </svg>
                                </button>
                                <p
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Home
                                </p>
                                </Link>

                                {/* Female Button */}
                                <Link to={"/"} className='flex items-center justify-center group'>
                                <button className='py-2 px-3 2xl:py-3 2xl:px-2 2xl:justify-center'>
                                    <svg
                                    className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 text-white hover:text-[#FF6FCF] transition-transform duration-200 ease-in-out hover:-translate-y-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    width="1em"
                                    height="1em"
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M430 190c0-95.94-78.06-174-174-174S82 94.06 82 190c0 88.49 66.4 161.77 152 172.61V394h-36a22 22 0 0 0 0 44h36v36a22 22 0 0 0 44 0v-36h36a22 22 0 0 0 0-44h-36v-31.39c85.6-10.84 152-84.12 152-172.61m-304 0c0-71.68 58.32-130 130-130s130 58.32 130 130s-58.32 130-130 130s-130-58.32-130-130"
                                    ></path>
                                    </svg>
                                </button>
                                <p
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Female
                                </p>
                                </Link>

                                {/* Anime Button */}
                                <Link to={"/ai-anime"} className='flex items-center justify-center group'>
                                <button className='py-2 px-3 2xl:py-3 2xl:px-2 2xl:justify-center'>
                                <svg
                                className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 text-white 2xl:h-8 transition-all duration-200 ease-in-out hover:rotate-180 hover:text-[#FF6FCF]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                width="1em"
                                height="1em"
                                >
                                <path
                                    fill="currentColor"
                                    d="M58.961 27.12c-.614-.566-1.544-1.421-1.658-1.844c-.129-.478.237-1.678.505-2.554c.553-1.814 1.18-3.871.131-5.674c-1.06-1.825-3.172-2.303-5.035-2.725c-.882-.2-2.089-.473-2.421-.805s-.605-1.54-.806-2.422c-.422-1.864-.899-3.976-2.726-5.036c-.644-.373-1.395-.562-2.23-.562c-1.162 0-2.322.354-3.443.695c-.851.259-1.731.528-2.314.528a1 1 0 0 1-.239-.024c-.425-.115-1.279-1.043-1.845-1.658C35.571 3.618 34.089 2.007 31.939 2h-.011c-2.144 0-3.629 1.601-4.939 3.014c-.565.61-1.42 1.531-1.837 1.642a1 1 0 0 1-.229.022c-.582 0-1.464-.275-2.317-.541c-1.127-.351-2.292-.714-3.461-.714c-.825 0-1.566.186-2.203.553c-1.83 1.054-2.308 3.167-2.729 5.032c-.199.878-.471 2.082-.799 2.41c-.326.326-1.529.598-2.408.796c-1.864.422-3.977.9-5.032 2.729c-1.042 1.807-.402 3.858.162 5.668c.272.873.645 2.067.52 2.541c-.11.417-1.031 1.271-1.64 1.835c-1.346 1.248-3.021 2.8-3.015 4.953c.005 2.149 1.617 3.631 3.039 4.94c.615.566 1.543 1.42 1.657 1.844c.129.477-.237 1.678-.504 2.553c-.553 1.816-1.181 3.873-.132 5.678c1.059 1.824 3.171 2.303 5.034 2.725c.882.199 2.09.473 2.421.805c.333.332.606 1.541.806 2.422c.422 1.863.9 3.977 2.726 5.035c.642.375 1.394.564 2.231.564c1.162 0 2.322-.355 3.444-.697c.852-.26 1.733-.529 2.317-.527c.132 0 .206.014.238.023c.422.113 1.277 1.043 1.843 1.658c1.308 1.422 2.79 3.033 4.941 3.037c2.156 0 3.642-1.602 4.951-3.014c.565-.609 1.42-1.531 1.838-1.643a1 1 0 0 1 .225-.021c.581 0 1.463.275 2.316.541c1.128.352 2.295.717 3.465.717c.823 0 1.563-.186 2.2-.553c1.83-1.057 2.308-3.17 2.729-5.033c.198-.879.471-2.082.799-2.41c.327-.326 1.531-.6 2.41-.797c1.863-.422 3.976-.9 5.029-2.729c1.042-1.807.403-3.857-.16-5.666c-.272-.873-.645-2.068-.519-2.545c.11-.416 1.031-1.27 1.641-1.834c1.346-1.248 3.021-2.801 3.016-4.951c-.008-2.15-1.619-3.633-3.041-4.942M55.41 38.336c-.591 2.23 2.005 5.773.88 7.723c-1.141 1.98-5.516 1.508-7.122 3.113c-1.604 1.604-1.132 5.979-3.111 7.123c-.354.203-.761.285-1.202.285c-1.737 0-4.018-1.258-5.781-1.258q-.388-.002-.736.088c-2.152.57-3.935 4.59-6.267 4.59h-.007c-2.339-.006-4.107-4.043-6.267-4.627a3 3 0 0 0-.759-.092c-1.758-.002-4.027 1.225-5.761 1.225c-.452 0-.867-.084-1.228-.293c-1.983-1.152-1.509-5.531-3.121-7.143c-1.609-1.611-5.99-1.139-7.14-3.119c-1.136-1.957 1.44-5.516.838-7.748c-.581-2.158-4.621-3.929-4.626-6.268c-.007-2.337 4.02-4.118 4.588-6.271c.589-2.228-2.007-5.771-.882-7.722c1.141-1.979 5.516-1.508 7.122-3.111c1.604-1.605 1.132-5.982 3.112-7.122c.354-.205.762-.286 1.205-.286c1.736 0 4.014 1.254 5.778 1.254c.258 0 .506-.027.739-.089C27.813 8.022 29.595 4 31.928 4h.005c2.341.008 4.108 4.044 6.269 4.627c.239.065.495.093.762.093c1.757 0 4.023-1.223 5.757-1.223c.452 0 .867.083 1.228.292c1.983 1.151 1.509 5.531 3.121 7.143c1.611 1.61 5.989 1.137 7.142 3.121c1.136 1.953-1.441 5.515-.838 7.744c.583 2.16 4.621 3.93 4.628 6.271c.004 2.334-4.023 4.118-4.592 6.268"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M44.119 43.668a18.6 18.6 0 0 1-7.712 3.061c-2.709.4-5.479.203-8.054-.6c-2.582-.787-4.939-2.168-6.96-3.943c-2.013-1.77-3.708-3.973-4.756-6.576c-1.05-2.584-1.432-5.549-.889-8.404c.521-2.859 1.957-5.549 3.997-7.625c2.025-2.068 4.721-3.387 7.5-3.637c2.772-.295 5.534.395 7.781 1.75a13.5 13.5 0 0 1 2.977 2.443a9.2 9.2 0 0 1 1.869 3.156c.789 2.283.597 4.854-.47 6.938a9.2 9.2 0 0 1-2.155 2.73c-.767.637-1.777 1.17-2.816 1.375c-2.1.492-4.423-.137-6.041-1.672c-1.487-1.34-2.011-3.805-1.072-5.818c.234-.512.534-.953.949-1.412a3.8 3.8 0 0 1 1.239-.916a4.47 4.47 0 0 1 3.323-.146a4.7 4.7 0 0 1 1.55.93c.43.381.787.91.991 1.502c.432 1.186.261 2.68-.614 3.857l.354.354c1.308-.967 2.107-2.746 1.892-4.549a5.5 5.5 0 0 0-.988-2.564c-.535-.752-1.233-1.365-2.04-1.846c-1.61-.967-3.665-1.248-5.563-.699a7.35 7.35 0 0 0-2.671 1.391a8.8 8.8 0 0 0-1.884 2.15a9.2 9.2 0 0 0-1.371 5.652a9.5 9.5 0 0 0 2.364 5.48c1.274 1.459 2.976 2.557 4.835 3.184c1.861.633 3.89.744 5.828.371c1.943-.406 3.761-1.256 5.291-2.621a13.2 13.2 0 0 0 3.294-4.527c1.554-3.43 1.567-7.443.126-10.838c-1.42-3.441-4.281-5.998-7.443-7.375c-3.189-1.41-6.773-1.617-9.996-.801a16.17 16.17 0 0 0-8.208 5.068a20.8 20.8 0 0 0-4.506 8.324c-.851 3.078-1.04 6.404-.355 9.662c.681 3.244 2.277 6.408 4.681 8.84c4.778 4.93 12.279 6.82 18.783 5.139a18.8 18.8 0 0 0 8.59-4.799a19.2 19.2 0 0 0 4.933-8.068l-.447-.225c-1.744 2.509-3.775 4.689-6.136 6.304"
                                ></path>
                                </svg>
                                </button>
                                <p
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Anime
                                </p>
                                </Link>

                                {/* Male Button */}
                                <Link to={"/ai-dogs"} className='flex items-center justify-center group'>
                                <button className='py-2 px-3 2xl:py-3 2xl:px-2 2xl:justify-center'>
                                    <svg
                                    className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 text-white transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:text-[#FF6FCF]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    width="1em"
                                    height="1em"
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M442 48h-90a22 22 0 0 0 0 44h36.89l-60.39 60.39c-68.19-52.86-167-48-229.54 14.57C31.12 234.81 31.12 345.19 99 413a174.21 174.21 0 0 0 246 0c62.57-62.58 67.43-161.35 14.57-229.54L420 123.11V160a22 22 0 0 0 44 0V70a22 22 0 0 0-22-22M313.92 381.92a130.13 130.13 0 0 1-183.84 0c-50.69-50.68-50.69-133.16 0-183.84s133.16-50.69 183.84 0s50.69 133.16 0 183.84"
                                    ></path>
                                    </svg>
                                </button>
                                <p
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Male
                                </p>
                                </Link>
                                
                                {/* Contact Us Button */}
                                <Link to={"/contact-us"} className='flex items-center justify-center group'>
                                <button className='py-2 px-3 2xl:py-3 2xl:px-2 2xl:justify-center'>
                                <svg
                                className="w-6 h-6 md:w-7 md:h-7 2xl:w-9 2xl:h-9 text-white hover:text-[#FF6FCF]"
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
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Contact Us
                                </p>
                                </Link>
                            </div>

                            {/* topbar icons set 2 */}
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={openDropdown ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                            <div className='2xl:hidden'><p className='flex p-3 text-gray-300'>Chat Menu</p></div>
                            <div className="flex 2xl:flex-col p-1">
                                <div className='flex 2xl:border-t-2 2xl:border-gray-700'>
                                    
                                </div>

                                {/* convos Button */}
                                <button className='py-2 px-3 2xl:py-3 2xl:px-2 2xl:justify-center'
                                onClick={() => handleSelect("identity", "convos")}
                                >
                                    <svg
                                    className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 text-white transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:text-[#FF6FCF]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="1em"
                                    height="1em"
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
                                </button>
                                <p
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Conversations
                                </p>

                                {/* chat Button */}
                                <button className='py-2 px-3 2xl:py-3 2xl:px-2 2xl:justify-center'
                                onClick={() => handleSelect("identity", "chat")}
                                >
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 text-white 2xl:h-8 transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:text-[#FF6FCF]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="1em"
                                    height="1em"
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M22 6.98V16c0 1.1-.9 2-2 2H6l-4 4V4c0-1.1.9-2 2-2h10.1A5.002 5.002 0 0 0 19 8c1.13 0 2.16-.39 3-1.02M16 3c0 1.66 1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3"
                                    ></path>
                                </svg>
                                </button>
                                <p
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Chat
                                </p>

                                {/* profile Button */}
                                <button className='py-2 px-3 2xl:py-3 2xl:px-2 2xl:justify-center'
                                onClick={() => handleSelect("identity", "profile")}
                                >
                                    <svg
                                    className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 text-white transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:text-[#FF6FCF]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="1em"
                                    height="1em"
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3m6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1z"
                                    ></path>
                                </svg>
                                </button>
                                <p
                                className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                >
                                Profile
                                </p>

                            </div>
                            
                            {/* settings button */}
                            {user && (
                                <>
                                <div className='2xl:hidden'><p className='flex p-3 text-gray-300'>Account</p></div>
                                <div className='flex mx-auto 2xl:border-t-2 p-1 2xl:border-gray-700'>
                                    <button
                                        className="py-2 px-3 2xl:py-3 2xl:px-2 transition-transform duration-200 ease-in-out hover:scale-110 outline-none rounded-lg"
                                        onClick={onSettingsClick}
                                    >
                                        <svg
                                        className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 text-white hover:text-[#FF6FCF]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="1em"
                                        height="1em"
                                        >
                                        <path
                                            fill="currentColor"
                                            d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6"
                                        ></path>
                                        </svg>
                                    </button>
                                    <p
                                    className={`hidden 2xl:block text-nowrap group-hover:transition-opacity opacity-0 group-hover:opacity-100 duration-300 left-6 absolute shadow-md rounded-2xl p-2 text-white bg-gray-700`}
                                    >
                                    Settings
                                    </p>
                                </div>
                                </>
                                )}
                            </motion.div>
                        </div>


                        {/* Dropdown for Conversations */}
                        {currentCharacter && (
                        <div
                        className="flex border-l 2xl:border-l-0 border-gray-700"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            <button
                                onClick={() => toggleDropdown('identity')}
                                className={`text-gray-300 hover:text-[#FF6FCF] 2xl:py-1 py-2 transition-all ease-in-out px-3 2xl:mx-auto 2xl:my-2 items-center justify-center rounded-full ${
                                    openDropdown ? 'rotate-180 2xl:-rotate-180' : '2xl:rotate-0'
                                    }`}
                                type="button"
                                >
                                <svg
                                className='w-5 h-5 2xl:w-7 2xl:h-7'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 14 14"
                                width="1em"
                                height="1em"
                                >
                                <g
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m.5 6.46l6.15 6.14a.48.48 0 0 0 .7 0l6.15-6.14"></path>
                                    <path d="M.5 1.25L6.65 7.4a.5.5 0 0 0 .7 0l6.15-6.15"></path>
                                </g>
                                </svg>
                            </button>
                                {openDropdown === 'identity' && (
                                <div className="z-10 hidden absolute divide-y right-0 2xl:-right-16 divide-gray-100 rounded-2xl shadow w-30 bg-gray-700 ">
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