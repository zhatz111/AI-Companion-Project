import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';

const MainLayout = ({ children }) => {
    // State management
    const [isOpen, setOpen] = useState(false); // Sidebar state
    const [isLoginVisible, setLoginVisible] = useState(false); // Login modal state
    const [isCreateVisible, setCreateVisible] = useState(false); // Login modal state

    // Handlers
    const toggleSidebar = () => setOpen(!isOpen);
    const handleToggleLogin = () => setLoginVisible(!isLoginVisible);
    const handleToggleCreate = () => setCreateVisible(!isCreateVisible);

    return (
    <div className="flex overflow-y-auto scrollbar bg-[#212121]">
        {/* Top Bar */}
        <TopBar
        isOpen={isOpen}
        setOpen={setOpen}
        onLoginClick={handleToggleLogin}
        onCreateClick={handleToggleCreate}
        />

        {/* Login Modal */}
        <Login isVisible={isLoginVisible} onClose={handleToggleLogin} />
        <CreateAccount isVisible={isCreateVisible} onClose={handleToggleCreate} />

        <div className="flex-1 overflow-y-auto">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            {/* Page Content */}
            <div className={`${isOpen ? 'sm:pl-56 pl-20' : 'pl-20'} transition-all duration-500 ease-in-out`}>
                {children}
            </div>
        </div>
    </div>
    )
};


export default MainLayout;