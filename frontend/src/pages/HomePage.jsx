import React, { useContext } from 'react'
import Hero from '../components/Hero'
import CharacterCards from '../components/CharacterCards'
import ChatTopBar from '../components/ChatTopBar';

const HomePage = ({ type, subType }) => {
    const img_path = '/images/extras/banner_aura_scaled.png'
  return (
    <div className="flex flex-col mx-auto 2xl:mx-56 bg-[#212121]">
        <Hero image={img_path}/>
        <div className="flex flex-col bg-[#212121] pt-2">
            <CharacterCards gender={type} type={subType}/>
        </div>
    </div>
  )
}

export default HomePage