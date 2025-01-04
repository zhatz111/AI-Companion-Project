import React from 'react'
import Hero from '../components/Hero'
import CharacterCards from '../components/CharacterCards'

const HomePage = ({ type }) => {
    const img_path = '/images/banner_aura.png'
  return (
    <div className="flex flex-col sm:ml-4 sm:mr-4 mt-16 mb-8 h-full bg-[#212121] transition-all duration-500 ease-in-out min-h-screen">
        <Hero image={img_path}/>
        <section className="bg-[#212121] w-full">
            <CharacterCards gender={type}/>
        </section>
    </div>
  )
}

export default HomePage