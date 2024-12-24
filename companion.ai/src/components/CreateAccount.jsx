import React from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";

const CreateAccount = ({ isVisible, onClose }) => {
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
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
            {/* <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
            /> */}
            Create Account
            </a>
            <form className="space-y-4 md:space-y-6">
            <div>
                {/* <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Email
                </label> */}
                <MdPermIdentity size="20" className='absolute text-gray-400 mt-3 ml-3'/>
                <input
                type="name"
                id="name"
                className="bg-gray-50 border pl-10 border-gray-300 text-gray-900 rounded-lg focus:ring-[#FF6FCF] focus:border-[#FF6FCF] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required
                />
            </div>
            <div>
                {/* <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Email
                </label> */}
                <MdEmail size="20" className='absolute text-gray-400 mt-3 ml-3'/>
                <input
                type="email"
                id="email"
                className="bg-gray-50 border pl-10 border-gray-300 text-gray-900 rounded-lg focus:ring-[#FF6FCF] focus:border-[#FF6FCF] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="E-mail"
                required
                />
            </div>
            <div>
                {/* <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Password
                </label> */}
                <RiLockPasswordLine size="20" className='absolute text-gray-400 mt-3 ml-3' />
                <input
                type="password"
                id="password"
                placeholder="Password"
                className="bg-gray-50 border pl-10 border-gray-300 text-gray-900 rounded-lg focus:ring-[#FF6FCF] focus:border-[#FF6FCF] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                />
            </div>
            <div>
                {/* <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Password
                </label> */}
                <RiLockPasswordLine size="20" className='absolute text-gray-400 mt-3 ml-3' />
                <input
                type="confirm password"
                id="confirm password"
                placeholder="Confirm Password"
                className="bg-gray-50 border pl-10 border-gray-300 text-gray-900 rounded-lg focus:ring-[#FF6FCF] focus:border-[#FF6FCF] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                />
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Minimum of 6 Characters
            </p>
            <button
                type="submit"
                className="w-full text-white bg-[#FF6FCF] hover:bg-[#FF6FCF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Create Account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                By signing up, you agree to {' '}
                <a
                href="#"
                className="font-medium text-white underline"
                >
                Terms of Service
                </a>
            </p>
            </form>
        </div>
        </div>
    </div>
  )
}

export default CreateAccount