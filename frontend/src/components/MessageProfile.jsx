import React, { useState } from "react";

import { FaBirthdayCake } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { IoBody } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import { IoMdPeople } from "react-icons/io";
import { MdSportsMartialArts } from "react-icons/md";
import { PiHeadCircuitFill } from "react-icons/pi";
import { Carousel } from "flowbite-react";

const MessageProfile = ({ item }) => {
    return (
        <div className="flex">
            <div>
                
                <div className="h-128 p-6 rounded-3xl">
                <Carousel slide={false}>
                    <img className="rounded-3xl" src={item.alt_img_path} alt={item.name} />
                    <img className="rounded-3xl" src={item.img_path} alt={item.name} />
                </Carousel>
                </div>



                <div className='pl-4 pt-2 pr-2'>
                    <h1 className="text-sm sm:text-xl 2xl:text-3xl font-bold text-white text-left">{item.name}</h1>
                    <h2 className="text-xs sm:text-md xl:text-lg text-gray-300 text-left py-4">{item.description}</h2>
                </div>
                <div className='pl-4 pt-4 pr-2 mb-6'>
                    <h1 className="text-sm sm:text-2xl font-bold text-[#FF6FCF] text-left mb-2">About Me</h1>
                    <div className='flex flex-row w-full py-4'>
                        <FaBirthdayCake className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">AGE</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{`${item.age} years old`}</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full py-4'>
                        <GiBodyHeight className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">HEIGHT</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{item.height}</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full py-4'>
                        <GiWorld className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">ETHNICITY</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{item.race}</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full py-4'>
                        <IoBody className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">BODY TYPE</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{item.body_type}</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full py-4'>
                        <MdWork className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">OCCUPATION</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{item.job}</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full py-4'>
                        <IoMdPeople className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">RELATIONSHIP</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{item.relationship}</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full py-4'>
                        <MdSportsMartialArts className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">HOBBIES</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{item.hobbies?.join(', ')}</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full py-4'>
                        <PiHeadCircuitFill className='text-white text-2xl mt-2'/>
                        <div className='flex flex-col'>
                            <p className="text-xs sm:text-MD text-gray-400 text-left ml-4">PERSONALITY</p>
                            <p className="text-xs sm:text-md 2xl:text-lg text-gray-100 text-left ml-4">{item.personality?.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageProfile