import React, { useState, useContext } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AuthContext } from '../api/AuthContext';

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const Login = ({ isVisible, onClose, onSignUp }) => {
    if (!isVisible) return null; // Do not render if not visible
    
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(formData.email, formData.password);
            setMessage("Login successful!");
            setFormData({ email: "", password: "" })
            await timeout(500);
            onClose();
        } catch (error) {
            setMessage("Error: " + error.response?.data?.detail || "Something went wrong.");
        }
        
    };

    return (
        <div>
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50"
                onClick={onClose} // Close the overlay when clicking outside
            >
                <div
                    className="bg-[#121212] rounded-lg p-8 shadow-lg w-full max-w-md"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <h2
                        href="/"
                        className="flex items-center mb-6 text-2xl font-semibold text-white"
                    >
                        Sign In
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <MdEmail size="20" className='absolute text-gray-400 mt-3 ml-3' />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="rounded-md outline-none pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                                className="rounded-md outline-none pl-10 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full outline-none text-white bg-[#FF6FCF] hover:bg-[#FF6FCF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Sign in
                        </button>
                        {message && <p className="mt-4 text-white text-sm">{message}</p>}
                        <p className="text-sm font-light text-gray-400">
                            Don’t have an account yet?{' '}
                            <button
                                type="button"
                                onClick={onSignUp}
                                className="font-medium text-white hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
