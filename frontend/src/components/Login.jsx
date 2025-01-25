import React, { useState, useContext } from 'react';
import { MdEmail } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { AuthContext } from '../api/AuthContext';
import { forgotPassword } from '../api/apiService'; // Import your forgotPassword API call

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const Login = ({ isVisible, onClose, onSignUp }) => {
    if (!isVisible) return null; // Do not render if not visible
    
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [reset, setReset] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.email)
        try {
            if (reset) {
                // Call forgotPassword when reset is true
                await forgotPassword(formData.email);
                setMessage("Password reset link sent successfully!");
                setFormData({ email: ""});
                await timeout(500);
                onClose();
            } else {
                // Call login when reset is false
                await login(formData.email, formData.password);
                setMessage("Login successful!");
                setFormData({ email: "", password: "" });
                await timeout(500);
                onClose();
            }
        } catch (error) {
            setMessage(error.response?.data?.detail || "Something went wrong.");
        }
    };
    

    return (
        <div>
            {!reset ? (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80  z-50"
                onClick={onClose} // Close the overlay when clicking outside
            >
                <div
                    className="bg-[#212121] rounded-2xl shadow-lg w-full mx-auto sm:max-w-md max-w-xs"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <div className="border-b flex-row flex items-center justify-between border-[#FF6FCF] p-6">
                        <h2 className="text-2xl font-semibold text-[#FF6FCF]">Login</h2>
                        <IoMdClose
                        className="hover:bg-gray-500 p-2 rounded-full text-[#FF6FCF] cursor-pointer"
                        size={35}
                        onClick={onClose} // Add a close handler here
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 md:space-y-6">
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
                            <button
                                type="button"
                                onClick={() => setReset(!reset)}
                                className="font-medium text-white hover:underline"
                            >
                                Forgot Password?
                            </button>
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
            ) : (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                onClick={onClose} // Close the overlay when clicking outside
            >
                <div
                    className="bg-[#212121] rounded-lg shadow-lg w-full max-w-md"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <div className="border-b flex-row flex items-center justify-between border-[#FF6FCF] p-6">
                        <h2 className="text-2xl font-semibold text-[#FF6FCF]">Reset Password</h2>
                        <IoMdClose
                        className="hover:bg-gray-500 p-2 rounded-full text-[#FF6FCF] cursor-pointer"
                        size={35}
                        onClick={onClose} // Add a close handler here
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 md:space-y-6">
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
                        <button
                            type="submit"
                            className="w-full outline-none text-white bg-[#FF6FCF] hover:bg-[#FF6FCF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Reset Password
                        </button>
                        {message && <p className="mt-4 text-white text-sm">{message}</p>}
                        <p className="text-sm font-light text-gray-400">
                            Remember your password?{' '}
                            <button
                                type="button"
                                onClick={() => setReset(!reset)}
                                className="font-medium text-white hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
};

export default Login;
