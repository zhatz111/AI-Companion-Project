import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="logo">MyApp</div>
      <div className="login-section">
        <button className="login-btn">Login</button>
      </div>
    </div>
  );
};

export default TopBar;
