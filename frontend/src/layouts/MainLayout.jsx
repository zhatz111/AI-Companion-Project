import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import AuthScreen from '../components/AuthScreen'; // Use AuthScreen instead of Login and CreateAccount
import Settings from '../components/Settings';
import Verification from '../components/Verification';
import { verifyEmail } from "../api/apiService"
import { EventContext } from '../api/EventContext';
import ChatTopBar from '../components/ChatTopBar';

const MainLayout = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [isAuthVisible, setAuthVisible] = useState(false); // Track the visibility of AuthScreen
    const [isLoginVisible, setIsLoginVisible] = useState(true); // Track which screen (Login or CreateAccount) to show
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [isVerifiedVisible, setIsVerifiedVisible] = useState(false);
    const [status, setStatus] = useState("Verifying...");
    const [error, setError] = useState(null);
    const { screenWidth } = useContext(EventContext);

    useEffect(() => {
        // Check if "verify-email" is in the URL
        const url = window.location.href;
        if (!url.includes("verify-email")) {
          setStatus("This page is not intended for email verification.");
          return;
        }
    
        // Extract the token from the URL query parameters
        const token = new URLSearchParams(window.location.search).get("token");
    
        if (!token) {
          setStatus("Token not found in the URL.");
          return;
        }
    
        // Call the verifyEmail function
        const verify = async () => {
          try {
            const response = await verifyEmail(token);
            setIsVerifiedVisible(true)
            setStatus("Email successfully verified! You can now log in.");
            console.log("Response:", response); // Optional: log the response for debugging
          } catch (err) {
            setStatus("Failed to verify email.");
            setError(err.message);
          }
        };
    
        verify();
      }, []); // Empty dependency array ensures this runs once on component mount

    const handleShowCreateAccount = () => {
        setIsLoginVisible(false); // Show Create Account view
    };

    const handleShowLogin = () => {
        setIsLoginVisible(true); // Show Login view
    };

    return (
        <div className="flex h-screen bg-[#212121]">
            <TopBar
                isOpen={isOpen}
                setOpen={setOpen}
                onLoginClick={() => {
                    setAuthVisible(true);  // Show AuthScreen
                    setIsLoginVisible(true);  // Make sure Login is visible initially
                }}
                onCreateClick={() => {
                    setAuthVisible(true);  // Show AuthScreen
                    setIsLoginVisible(false);  // Make sure CreateAccount is visible
                }}
            />

            {isAuthVisible && (
                <AuthScreen
                    isLoginVisible={isLoginVisible} // Pass the state to toggle between Login/CreateAccount
                    onClose={() => setAuthVisible(false)} // Close AuthScreen
                    onShowCreateAccount={handleShowCreateAccount} // Handle CreateAccount view toggle
                    onShowLogin={handleShowLogin} // Handle Login view toggle
                />
            )}

            <Verification isVerifiedVisible={isVerifiedVisible} onClose={() => setIsVerifiedVisible(false)}/>

            <Settings onClose={() => setIsSettingsVisible(false)} setIsSettingsVisible={setIsSettingsVisible} isSettingsVisible={isSettingsVisible}/>

            {/* <Sidebar isOpen={isOpen}  onLoginClick={() => {
                setAuthVisible(true);  // Show AuthScreen
                setIsLoginVisible(true);  // Make sure Login is visible initially
            }} toggleSidebar={() => setOpen(!isOpen)} onSettingsClick={() => setIsSettingsVisible(true)}/> */}
                {/* Top Bar Selector */}
            <div className='flex flex-col justify-between w-full'>
                <div className='flex mt-16'>
                    <ChatTopBar />
                </div>
                {children}
            </div>
        </div>
    );
};
// ${isOpen ? 'sm:pl-60 pl-24' : 'pl-24'}
export default MainLayout;
