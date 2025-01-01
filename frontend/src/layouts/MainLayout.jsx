import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import AuthScreen from '../components/AuthScreen'; // Use AuthScreen instead of Login and CreateAccount

const MainLayout = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [isAuthVisible, setAuthVisible] = useState(false); // Track the visibility of AuthScreen
    const [isLoginVisible, setIsLoginVisible] = useState(true); // Track which screen (Login or CreateAccount) to show

    const handleShowCreateAccount = () => {
        setIsLoginVisible(false); // Show Create Account view
    };

    const handleShowLogin = () => {
        setIsLoginVisible(true); // Show Login view
    };

    return (
        <div className="flex overflow-y-auto scrollbar bg-[#212121]">
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

            <div className="flex-1 overflow-y-auto">
                <Sidebar isOpen={isOpen}  onLoginClick={() => {
                    setAuthVisible(true);  // Show AuthScreen
                    setIsLoginVisible(true);  // Make sure Login is visible initially
                }} toggleSidebar={() => setOpen(!isOpen)} />
                <div className={`${isOpen ? 'sm:pl-56 pl-20' : 'pl-20'} transition-all duration-500 ease-in-out`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
