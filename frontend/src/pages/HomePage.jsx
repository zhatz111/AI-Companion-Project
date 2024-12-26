import React from 'react'
import Hero from '../components/Hero'
import CharacterCards from '../components/CharacterCards'

const HomePage = ({ isOpen }) => {
    const img_path = '/images/c_banner.jpg'
  return (
    <div className="absolute left-24 top-16 bottom-0 bg-[#212121] transition-all duration-500 ease-in-out overflow-y-scroll scrollbar">
      {/* ms:py-16 mm:ml-8 sm:py-20 sm:ml-4 */}
        <Hero image={img_path}/>
        <section className="bg-[#212121] w-full">
            <CharacterCards/>
        </section>
    </div>
  )
}

export default HomePage