import React, { useState } from 'react';
import Login from './Login'; // Assuming you have a Login component
import CreateAccount from './CreateAccount'; // Assuming you have a CreateAccount component

const AuthScreen = ({ onClose, isLoginVisible, onShowCreateAccount, onShowLogin }) => {

    // Close the modal and reset to Login view
    const handleClose = () => {
        isLoginVisible = false; // Reset to Login when closing
        onClose(); // Call the parent close handler
    };

    return (
        <div>
            {isLoginVisible ? (
                <Login
                    isVisible={true} // Login is visible when isLoginVisible is true
                    onClose={handleClose} // Close modal
                    onSignUp={onShowCreateAccount} // Show CreateAccount on sign-up
                />
            ) : (
                <CreateAccount
                    isVisible={true} // CreateAccount is visible when isCreateVisible is true
                    onClose={handleClose} // Close modal
                    onLogin={onShowLogin} // Show Login on login
                />
            )} 
        </div>
    );
};

export default AuthScreen;
