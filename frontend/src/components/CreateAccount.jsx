import React, { useState, useEffect, useContext } from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";
import { AuthContext } from '../api/AuthContext';

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const CreateAccount = ({ isVisible, onClose, onLogin }) => {
    if (!isVisible) return null; // Do not render if not visible

    const { registerUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData.username, formData.email, formData.password);
            setMessage("Account Succesfully Created!");
            setFormData({ username: "", email: "", password: "" })
            await timeout(500);
            onLogin();
        } catch (error) {
            setMessage("Error: " + error.response?.data?.detail || "Something went wrong.");
        }
    };

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
            className="flex items-center mb-6 text-2xl font-semibold text-white"
            >
            Create Account
            </a>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
                <MdPermIdentity size="20" className='absolute text-gray-400 mt-3 ml-3'/>
                <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="rounded-md pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <MdEmail size="20" className='absolute text-gray-400 mt-3 ml-3'/>
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-md pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <RiLockPasswordLine size="20" className='absolute text-gray-400 mt-3 ml-3' />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="rounded-md pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {/* <div>
                <RiLockPasswordLine size="20" className='absolute text-gray-400 mt-3 ml-3' />
                <input
                type="confirm password"
                id="confirm password"
                placeholder="Confirm Password"
                className="rounded-md pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div> */}

            <p className="text-sm font-light text-gray-400">
            Minimum of 6 Characters
            </p>
            <button
                type="submit"
                className="w-full text-white bg-[#FF6FCF] hover:bg-[#FF6FCF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Create Account
            </button>
            {message && <p className="mt-4 text-white text-sm">{message}</p>}
            <p className="text-sm font-light text-gray-400">
                Already have an account? {' '}
                <button
                    type="button"
                    onClick={onLogin}
                    className="font-medium text-white hover:underline"
                >
                    Login
                </button>
            </p>
            <p className="text-sm font-light text-gray-400">
                By signing up, you agree to {' '}
                <button
                    type="button"
                    onClick={onLogin}
                    className="font-medium text-white hover:underline"
                >
                    Terms of Service
                </button>
            </p>
            </form>
        </div>
        </div>
    </div>
  )
}

export default CreateAccount