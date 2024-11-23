import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <TopBar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
          <h1>Welcome to MyApp</h1>
          <p>Your sleek homepage is ready to be populated.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
