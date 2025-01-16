import React from 'react'
import { IoMdClose } from "react-icons/io";

const Verification = ({ isVerifiedVisible, onClose }) => {
    if (!isVerifiedVisible) return null; // Do not render if not visible
    return (
        <div className="bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center z-50 w-full" onClick={onClose}>
            <div className="flex flex-col rounded-2xl shadow-2xl w-full max-w-md bg-[#FF6FCF]" onClick={(e) => e.stopPropagation()}>
                {/* Header Section */}
                <div className="relative flex flex-col items-center p-12 bg-[#FF6FCF] rounded-t-2xl">
                {/* Center Top SVG */}
                <div className="absolute top-5 flex items-center justify-center w-14 h-14 bg-white rounded-full animate-pulse">
                    <svg
                    className="text-[#FF6FCF] w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M20 7L9.00004 18L3.99994 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                </div>
                {/* Close Button */}
                <div className="absolute top-8 right-4"> 
                    <IoMdClose
                    className="hover:bg-[#212121] p-2 rounded-full text-white cursor-pointer"
                    size={35}
                    onClick={onClose} // Add a close handler here
                    />
                </div>
                </div>

                {/* Content Section */}
                <div className="flex bg-[#212121] rounded-b-2xl p-6">
                <div className="flex flex-col p-5 text-center">
                    <span className="block text-[#FF6FCF] text-2xl font-semibold leading-6">
                    Email Verified!
                    </span>
                    <p className="mt-4 text-white text-sm leading-5">
                    Thank you for verifying your email. You can now close this window and
                    log into your new account!
                    </p>
                </div>
                </div>
            </div>
        </div>

      );
    };

export default Verification