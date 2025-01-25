import React, { useContext } from 'react'
import Hero from '../components/Hero'
import CharacterCards from '../components/CharacterCards'
import ChatTopBar from '../components/ChatTopBar';

const HomePage = ({ type }) => {
    const img_path = '/images/banner_aura_scaled.png'
  return (
    <div className="flex flex-col mx-auto bg-[#212121] transition-all duration-500 ease-in-out">
        <Hero image={img_path}/>
        <div className="flex flex-col flex-grow bg-[#212121] pt-2">
            <CharacterCards gender={type}/>
        </div>
    </div>
  )
}

export default HomePage