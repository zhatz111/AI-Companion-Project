import React from 'react'
import { useState } from 'react'
import {Spin as Hamburger} from "hamburger-react"
import asianCheerleader from './assets/ai_models/asian_cheerleader_2.jpg';
import latinaCarModel from "./assets/ai_models/latina_luxury_car.png"
import japaneseStreamer from "./assets/ai_models/japanese_streamer.png"
import blackInfluencer from "./assets/ai_models/black_influencer.png"
import groupWomen from "./assets/ai_models/group_women_3.png"
import groupWomenCrop from "./assets/ai_models/group_women_3_crop.png"

const App = () => {
  const [isOpen, setOpen] = useState(false)
  const maya_description = "Maya is a vivacious 21-year-old cheerleader with a contagious energy \
  that lights up every room she enters. Between perfecting her dynamic routines and cheering her team to victory, \
  she's ready to take on life's next big adventure: finding someone special. Maya is eager to meet a kind and \
  confident man who shares her enthusiasm for life and embraces her passion for fun and fitness."

  const latina_descrip = "Isabella exudes confidence and a passion for speed. With a magnetic smile and a daring \
  attitude, she tests high-end sports cars for performance, thrilling audiences with her control behind the wheel. \
  She's spontaneous, loves adrenaline, and has a soft spot for vintage motorsports."

  const japanese_descrip = "Ayumi is a brilliant tactician in the competitive gaming world. Known for \
  her strategic mind and playful personality, she captivates audiences with her gaming prowess and witty \
  commentary. She’s a blend of tech-savvy charm and geeky charisma, with a love for cosplay."

  const black_descrip = "Naomi inspires others with her dedication to health and strength. Her warm energy, \
  sculpted physique, and motivational attitude have made her a social media icon. Off-camera, she’s a nurturing \
  soul who enjoys hiking and cooking healthy meals for friends."

  return (
    <html className="h-full bg-[#212121]">
    <body className="h-full bg-[#212121] m-0 overflow-auto">
      <div id="root">
      <div className="flex-1 bg-[#212121] min-h-screen">

        {/* Main Layout */}
        <div className="flex-1 bg-[#212121]">

          {/* Navigation Top Bar */}
          <div className="fixed top-0 left-0 w-full bg-[#121212] z-50">
              <nav className="flex-1 bg-[#121212] border-b border-[#FF6FCF]">
                <div className="mx-auto px-2 sm:px-6 lg:px-8">  {/* max-w-7xl  */}
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center">
                      {/* <!-- Logo --> */}
                      <Hamburger size={23} color="#FF6FCF" toggled={isOpen} toggle={setOpen} />
                      <a className="flex flex-shrink-0 items-center mr-1 px-1" href="/index.html">
                      <span className=" text-white text-xl mm:text-2xl sm:text-3xl font-bold">Sweet</span>
                        <span className=" text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold">Aura</span>
                        <span className=" text-[#FF6FCF] text-xl mm:text-2xl sm:text-3xl font-bold">.ai</span>
                      </a>
                      <div className="ml-auto">
                        <div className="flex space-x-2 py-2 px-1">
                          <a href="/index.html" className="hidden sm:block text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-full px-2 py-1">Create Account</a>
                          <a href="/index.html" className="block sm:hidden text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-full px-2 py-1">Join</a>
                          <a href="/jobs.html" className="text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-full px-2 py-1">Login</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Side Bar Full Navigation */}
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <aside id="default-sidebar" className={`fixed sm:visible border-solid border-r border-[#FF6FCF] top-16 left-0 z-40 w-56 h-screen duration-300 ease-in-out transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`} aria-label="Sidebar">
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
                        <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full bg-gray-700 text-gray-300">Pro</span>
                      </a>
                    </li>
                  </ul>
              </div>
            </aside>

            {/* Side Bar Small Navigation */}
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <aside id="default-sidebar" className={`fixed invisible sm:visible border-solid border-r border-[#FF6FCF] top-16 left-0 z-40 w-30 h-full duration-300 ease-in-out transition-transform ${isOpen ? "-translate-x-full" : "translate-x-0"}`} aria-label="Sidebar">
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

          {/* <div className="flex-1 bg-[#212121] min-h-screen justify-between"> */}
          <div className={`flex flex-col min-h-screen bg-[#212121] py-4 sm:py-20 sm:ml-28 transition-all duration-300 ease-in-out ${isOpen ? "sm:pl-28" : "sm:pl-0"}`}>
            
            {/* <!-- Hero --> */}
            {/* <section className="flex-1 bg-[#1E1E2E] border border-[#FF6FCF] rounded-xl  px-10 py-20 mb-4"> */}
              <div className="relative px-10 py-8 text-center">
                <figure className="relative mx-auto group"> {/* Adjust max-w-lg as needed */}
                  <a href="#">
                    {/* Image */}
                    <img
                      className="w-full h-106 object-cover object-top rounded-lg shadow-lg"
                      src={groupWomenCrop}
                      alt=""
                    />
                  </a>
                  {/* Overlay Text */}
                  <figcaption className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 rounded-lg">
                    <span className="lg:my-2 text-md mm:text-lg sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white">
                      Explore your
                    </span>
                    <span className="text-md mm:text-lg sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#FF6FCF]">
                      Aura
                    </span>
                    <p className="lg:my-2 text-sm mm:text-md sm:text-2xl lg:text-3xl xl:text-4xl text-white">
                      Create your Sweetest AI Companion
                    </p>
                  </figcaption>
                </figure>
              </div>
            {/* </section> */}



            {/* <!-- Browse AI Characters --> */}
            <section className="bg-[#212121]">
              <div className="container-xl lg:container mx-auto text-center">
                <span className="text-lg mm:text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#FF6FCF] mb-6">Explore Unique </span>
                <span className="text-lg mm:text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">AI Characters</span>
                <div className="py-6 px-10 mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 mm:grid-cols-2 grid-cols-1 gap-8">

                  {/* <!-- Asian Cheerleader --> */}
                  <div className="bg-[#212121] rounded-xl shadow-lg relative">
                    <figure className="relative max-w-sm group">
                      <a href="#">
                        <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-lg shadow-lg transition-all cursor-pointer filter bg-opacity-30 brightness-[50%] duration-500 group-hover:filter-none" src={asianCheerleader} alt=""></img>
                      </a>
                      <a className='absolute top-3 right-3 border-2 sm:border-3 rounded-full border-[#FF6FCF] transition hover:bg-[#FF6FCF] py-2 px-2 group/message' href="/#">
                        <svg className="h-3 w-3 sm:h-5 sm:w-5 flex-no-shrink stroke-[#FF6FCF] transition duration-100 group-hover/message:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </a>
                      <figcaption className="absolute left-6 right-6 bottom-6 grid gap-2">
                          <p className="text-sm sm:text-2xl font-bold text-white text-left">Maya Lin</p>
                          <p className="text-xs sm:text-md text-gray-100 text-left">19 years old</p>
                          <p className="hidden sm:block text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,90)} ...</p>
                          <p className="block sm:hidden text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,30)} ...</p>
                      </figcaption>
                    </figure>
                  </div>
 
                  {/* <!-- Latina Car Model --> */}
                  <div className="bg-[#212121] rounded-xl shadow-lg relative">
                  <figure className="relative max-w-sm group">
                      <a href="#">
                        <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-lg shadow-lg transition-all cursor-pointer filter bg-opacity-30 brightness-[50%] duration-500 group-hover:filter-none" src={asianCheerleader} alt=""></img>
                      </a>
                      <a className='absolute top-3 right-3 border-2 sm:border-3 rounded-full border-[#FF6FCF] transition hover:bg-[#FF6FCF] py-2 px-2 group/message' href="/#">
                        <svg className="h-3 w-3 sm:h-5 sm:w-5 flex-no-shrink stroke-[#FF6FCF] transition duration-100 group-hover/message:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </a>
                      <figcaption className="absolute left-6 right-6 bottom-6 grid gap-2">
                          <p className="text-sm sm:text-2xl font-bold text-white text-left">Maya Lin</p>
                          <p className="text-xs sm:text-md text-gray-100 text-left">19 years old</p>
                          <p className="hidden sm:block text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,90)} ...</p>
                          <p className="block sm:hidden text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,30)} ...</p>
                      </figcaption>
                    </figure>
                  </div>

                  {/* <!-- Japanese Streamer --> */}
                  <div className="bg-[#212121] rounded-xl shadow-lg relative">
                  <figure className="relative max-w-sm group">
                      <a href="#">
                        <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-lg shadow-lg transition-all cursor-pointer filter bg-opacity-30 brightness-[50%] duration-500 group-hover:filter-none" src={asianCheerleader} alt=""></img>
                      </a>
                      <a className='absolute top-3 right-3 border-2 sm:border-3 rounded-full border-[#FF6FCF] transition hover:bg-[#FF6FCF] py-2 px-2 group/message' href="/#">
                        <svg className="h-3 w-3 sm:h-5 sm:w-5 flex-no-shrink stroke-[#FF6FCF] transition duration-100 group-hover/message:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </a>
                      <figcaption className="absolute left-6 right-6 bottom-6 grid gap-2">
                          <p className="text-sm sm:text-2xl font-bold text-white text-left">Maya Lin</p>
                          <p className="text-xs sm:text-md text-gray-100 text-left">19 years old</p>
                          <p className="hidden sm:block text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,90)} ...</p>
                          <p className="block sm:hidden text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,30)} ...</p>
                      </figcaption>
                    </figure>
                  </div>

                  {/* <!-- Black Fitness Influencer --> */}
                  <div className="bg-[#212121] rounded-xl shadow-lg relative">
                  <figure className="relative max-w-sm group">
                      <a href="#">
                        <img className="w-full h-78 mm:h-64 sm:h-128 object-cover rounded-lg shadow-lg transition-all cursor-pointer filter bg-opacity-30 brightness-[50%] duration-500 group-hover:filter-none" src={asianCheerleader} alt=""></img>
                      </a>
                      <a className='absolute top-3 right-3 border-2 sm:border-3 rounded-full border-[#FF6FCF] transition hover:bg-[#FF6FCF] py-2 px-2 group/message' href="/#">
                        <svg className="h-3 w-3 sm:h-5 sm:w-5 flex-no-shrink stroke-[#FF6FCF] transition duration-100 group-hover/message:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </a>
                      <figcaption className="absolute left-6 right-6 bottom-6 grid gap-2">
                          <p className="text-sm sm:text-2xl font-bold text-white text-left">Maya Lin</p>
                          <p className="text-xs sm:text-md text-gray-100 text-left">19 years old</p>
                          <p className="hidden sm:block text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,90)} ...</p>
                          <p className="block sm:hidden text-xs sm:text-md text-gray-300 text-left">{maya_description.slice(0,30)} ...</p>
                      </figcaption>
                    </figure>
                  </div>

                </div>
              </div>
            </section>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  )
}

export default App