import React from 'react'
import { useState } from 'react'
import {Spin as Hamburger} from "hamburger-react"
import asianCheerleader from './assets/ai_models/asian_cheerleader.jpg';
import asianCheerleader_2 from './assets/ai_models/asian_cheerleader_2.jpg';

const App = () => {
  const [isOpen, setOpen] = useState(false)
  const maya_description = "Maya is a vivacious 21-year-old cheerleader with a contagious energy \
  that lights up every room she enters. Between perfecting her dynamic routines and cheering her team to victory, \
  she's ready to take on life's next big adventure: finding someone special. Maya is eager to meet a kind and \
  confident man who shares her enthusiasm for life and embraces her passion for fun and fitness."
  return (
      <div className="flex-1 bg-[#212121] min-h-full">
        

        {/* Main Layout */}
        <div className="flex-1 min-h-full">
          {/* Navigation Top Bar */}
          <div className="fixed top-0 left-0 w-full bg-[#121212] z-50">
              <nav className="flex-1 bg-[#121212] border-b border-[#FF6FCF]">
                <div className="mx-auto px-2 sm:px-6 lg:px-8">  {/* max-w-7xl  */}
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                      {/* <!-- Logo --> */}
                      <Hamburger size={23} color="#FF6FCF" toggled={isOpen} toggle={setOpen} />
                      <a className="flex flex-shrink-0 items-center mr-4 px-4" href="/index.html">
                      <span className="hidden md:block text-white text-3xl font-bold ml-2">Sweet</span>
                        <span className="hidden md:block text-[#FF6FCF] text-3xl font-bold">Aura</span>
                        <span className="hidden md:block text-[#FF6FCF] text-3xl font-bold">.ai</span>
                      </a>
                      <div className="md:ml-auto">
                        <div className="flex space-x-4 py-2 px-4">
                          <a href="/index.html" className="text-[#FF6FCF] hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-full px-3 py-1">Create Account</a>
                          <a href="/jobs.html" className="text-[#FF6FCF] hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-full px-3 py-1">Login</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Side Bar Full Navigation */}
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <aside id="default-sidebar" className={`fixed border-solid border-r border-[#FF6FCF] top-15 left-0 z-40 w-56 h-screen duration-300 ease-in-out transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`} aria-label="Sidebar">
              <div className="h-full px-3 py-4 overflow-y-auto bg-[#121212] border-b border-[#FF6FCF]">
                  <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#" className="flex items-center bg-[#212121] p-2 text-white rounded-lg border-solid border-2 border-gray-500 hover:bg-[#121212] group">
                          <svg className="w-5 h-5 text-white transition duration-75 group-hover:text-[#FF6FCF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                          </svg>
                          <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center bg-[#212121] p-2 text-white rounded-lg border-solid border-2 border-gray-500 hover:bg-[#121212] group">
                        <svg className="w-5 h-5 text-white transition duration-75 group-hover:text-[#FF6FCF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                        <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                      </a>
                    </li>
                  </ul>
              </div>
            </aside>
            {/* Side Bar Small Navigation */}
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <aside id="default-sidebar" className={`fixed border-solid border-r border-[#FF6FCF] top-15 left-0 z-40 w-32 h-full duration-300 ease-in-out transition-transform ${isOpen ? "-translate-x-full" : "translate-x-0"}`} aria-label="Sidebar">
              <div className="h-full px-6 py-6 overflow-y-auto bg-[#121212] border-b border-[#FF6FCF] items-center justify-center">
                  <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#" className="flex justify-center w-16 bg-[#212121] p-2 text-white rounded-lg border-solid border-2 border-gray-500 hover:bg-[#121212] group">
                          <svg className="h-8 w-8 text-white transition duration-75 group-hover:text-[#FF6FCF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                          </svg>
                        </a>
                    </li>
                    <li>
                      <a href="#" className="flex justify-center w-16 bg-[#212121] p-2 text-white rounded-lg border-solid border-2 border-gray-500 hover:bg-[#121212] group">
                        <svg className="h-8 w-8 text-white transition duration-75 group-hover:text-[#FF6FCF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                      </a>
                    </li>
                  </ul>
              </div>
            </aside>

          <div class="flex flex-col min-h-screen justify-between overflow-auto">
          <div className={`flex-1 min-h-full py-10 bg-[#212121] transition-all duration-300 ease-in-out ${isOpen ? "ml-32" : "ml-0"}`}>
            
            
            {/* <!-- Hero --> */}
            <section className="container-xl bg-[#1E1E2E] border border-[#FF6FCF] rounded-xl lg:container mx-auto px-10 py-20 mb-4">
              <div>
                <div className="text-center">
                  <span className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">Explore your</span>
                  <span className="text-4xl font-extrabold text-[#FF6FCF] sm:text-5xl md:text-6xl"> Aura</span>
                  <p className="my-4 text-xl text-white">Create your Perfect AI Companion</p>
                </div>
              </div>
            </section>

            {/* <!-- Browse Jobs --> */}
            <section className="bg-[#212121] px-4 py-10">
              <div className="container-xl lg:container m-auto text-center">
                <span className="text-3xl font-bold text-[#FF6FCF] mb-6">Explore Unique </span>
                <span className="text-3xl font-bold text-white mb-6">AI Characters</span>
                <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                  {/* <!-- Asian Cheerleader --> */}
                  <div className="bg-[#1E1E2E] rounded-xl shadow-lg relative">
                    <figure className="relative max-w-sm"> 
                      <a href="#">
                        <img className="rounded-lg shadow-lg transition-all cursor-pointer filter blur-sm brightness-[50%] duration-500 hover:filter-none" src={asianCheerleader_2} alt="Asian Cheerleader"></img>
                      </a>
                      <figcaption className="absolute px-4 py-5 text-xl text-white bottom-28">
                          <h2 className='text-3xl font-bold text-white text-left'>Maya Lin</h2>
                          {/* <p className='text-left'>Do you want to get notified when a new component is added to Flowbite?</p> */}
                      </figcaption>
                      <figcaption className="absolute px-4 text-lg text-gray-300 bottom-6">
                          {/* <h2 className='text-3xl font-bold text-white text-left'>Helena</h2> */}
                          <p className='text-left font-bold'>{maya_description.slice(0,90)} ...</p>
                      </figcaption>
                    </figure>
                  </div>

                  {/* <!-- Asian Cheerleader --> */}
                  <div className="bg-[#1E1E2E] rounded-xl shadow-lg relative">
                    <figure className="relative max-w-sm"> 
                      <a href="#">
                        <img className="mx-auto rounded-lg shadow-lg transition-all cursor-pointer filter blur-sm brightness-[50%] duration-500 hover:filter-none" src={asianCheerleader} alt="Asian Cheerleader"></img>
                      </a>
                      <figcaption className="absolute px-4 py-5 text-xl text-white bottom-28">
                          <h2 className='text-3xl font-bold text-white text-left'>Maya Lin</h2>
                          {/* <p className='text-left'>Do you want to get notified when a new component is added to Flowbite?</p> */}
                      </figcaption>
                      <figcaption className="absolute px-4 text-lg text-gray-300 bottom-6">
                          {/* <h2 className='text-3xl font-bold text-white text-left'>Helena</h2> */}
                          <p className='text-left font-bold'>{maya_description.slice(0,90)} ...</p>
                      </figcaption>
                    </figure>
                  </div>

                  {/* <!-- Asian Cheerleader --> */}
                  <div className="bg-[#1E1E2E] rounded-xl shadow-lg relative">
                    <figure className="relative max-w-sm"> 
                      <a href="#">
                        <img className="rounded-lg shadow-lg transition-all cursor-pointer filter blur-sm brightness-[50%] duration-500 hover:filter-none" src={asianCheerleader} alt="Asian Cheerleader"></img>
                      </a>
                      <figcaption className="absolute px-4 py-5 text-xl text-white bottom-28">
                          <h2 className='text-3xl font-bold text-white text-left'>Maya Lin</h2>
                          {/* <p className='text-left'>Do you want to get notified when a new component is added to Flowbite?</p> */}
                      </figcaption>
                      <figcaption className="absolute px-4 text-lg text-gray-300 bottom-6">
                          {/* <h2 className='text-3xl font-bold text-white text-left'>Helena</h2> */}
                          <p className='text-left font-bold'>{maya_description.slice(0,90)} ...</p>
                      </figcaption>
                    </figure>
                  </div>

                  {/* <!-- Job Listing 2 --> */}
                  <div className="bg-white rounded-xl shadow-md relative">
                    <div className="p-4">
                      <div className="mb-6">
                        <div className="text-gray-600 my-2">Remote</div>
                        <h3 className="text-xl font-bold">Front-End Engineer (React)</h3>
                      </div>

                      <div className="mb-5">
                      Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion...
                      </div>

                      <h3 className="text-indigo-500 mb-2">$70K - $80K / Year</h3>

                      <div className="border border-gray-100 mb-5"></div>

                      <div className="flex flex-col lg:flex-row justify-between mb-4">
                        <div className="text-orange-700 mb-3">
                          <i className="fa-solid fa-location-dot text-lg"></i>
                          Miami, FL
                        </div>
                        <a
                          href="job.html"
                          className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                        >
                        Read More
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Job Listing 3 --> */}
                  <div className="bg-white rounded-xl shadow-md relative">
                    <div className="p-4">
                      <div className="mb-6">
                        <div className="text-gray-600 my-2">Remote</div>
                        <h3 className="text-xl font-bold">React.js Developer</h3>
                      </div>

                      <div className="mb-5">
                        Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference...
                      </div>

                      <h3 className="text-indigo-500 mb-2">$70K - $80K / Year</h3>

                      <div className="border border-gray-100 mb-5"></div>

                      <div className="flex flex-col lg:flex-row justify-between mb-4">
                        <div className="text-orange-700 mb-3">
                          <i className="fa-solid fa-location-dot text-lg"></i>
                          Brooklyn, NY
                        </div>
                        <a
                          href="job.html"
                          className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                        >
                        Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App