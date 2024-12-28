import React from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


const Login = ({ isVisible, onClose }) => {
    if (!isVisible) return null; // Do not render if not visible

  return (
    <div>
        <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose} // Close the overlay when clicking outside
        >
        <div
            className="bg-[#121212] rounded-lg p-8 shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
            >
            {/* <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
            /> */}
            Sign In
            </a>
            <form className="space-y-4 md:space-y-6">
            <div>
                {/* <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                Email
                </label> */}
                <MdEmail size="20" className='absolute text-gray-400 mt-3 ml-3'/>
                <input
                type="email"
                id="email"
                className="rounded-md pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="E-mail"
                required
                />
            </div>
            <div>
                {/* <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                Password
                </label> */}
                <RiLockPasswordLine size="20" className='absolute text-gray-400 mt-3 ml-3' />
                <input
                type="password"
                id="password"
                placeholder="Password"
                className="rounded-md pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
            <p className="text-sm font-light text-gray-400">
            <a
            href="#"
            className="font-medium text-white hover:underline"
            >
            Forgot Password?
            </a>
            </p>
            <button
                type="submit"
                className="w-full text-white bg-[#FF6FCF] hover:bg-[#FF6FCF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Sign in
            </button>
            <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{' '}
                <a
                href="#"
                className="font-medium text-white hover:underline"
                >
                Sign up
                </a>
            </p>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login