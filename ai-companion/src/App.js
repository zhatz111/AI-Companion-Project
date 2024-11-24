import React, { useState } from "react";
import "./App.css";
import "./components/TopBar.css";
import "./components/Sidebar.css";
import "./components/HomePage.css";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <div className="topbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>My App</h1>
      </div>
      {isSidebarOpen && <div className="backdrop"></div>}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-list">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className={`content-wrapper ${isSidebarOpen ? "blurred" : ""}`}>
        <div className={`content-wrapper ${isSidebarOpen ? "shifted" : ""}`}>
          <div className="content">
            <p>Welcome to the main content area!</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
