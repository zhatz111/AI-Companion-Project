import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';


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
            path="/chat/:itemId"
            element={ <ChatPage /> }
          />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App