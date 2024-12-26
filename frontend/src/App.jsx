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
          {/* <Route
            path="/contact"
            element={ <ContactPage /> }
          /> */}
        </Routes>
      </MainLayout>
    </Router>

    // <div className='flex min-h-screen bg-[#212121]'>
    //   <TopBar isOpen={isOpen} setOpen={setOpen} onLoginClick={handleToggleLogin} />
    //   <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    //   <Login isVisible={isLoginVisible} onClose={handleToggleLogin} />
      // <div className={`flex flex-col min-h-screen bg-[#212121] py-4 sm:py-20 sm:ml-4 transition-all duration-300 ease-in-out`}>
      //   <Hero image={groupWomenCrop}/>
      //   <section className="bg-[#212121] w-full">
      //     <CharacterCards/>
      //   </section>
      // </div>
    // </div>
  )
}

export default App