import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

// import TopBar from './components/TopBar';
// import Sidebar from './components/Sidebar';
// import Hero from './components/Hero';
// import CharacterCards from './components/CharacterCards';
// import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={ <HomePage /> }
          />
          <Route
            path="/chat"
            element={ <ChatPage /> }
          />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App