import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={ <HomePage type="female"/> }
          />
          <Route
            path="/ai-dogs"
            element={ <HomePage type="male"/> }
          />
          <Route
            path="/ai-anime"
            element={ <HomePage type="anime"/> }
          />
          <Route
            path="/reset-password"
            element={ <ResetPasswordPage/> }
          />
          <Route
            path="/contact-us"
            element={ <ContactPage/> }
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