import React from 'react'
import Card from './Card'
import characters from '../data/characters'

const CharacterCards = () => {
  return (
    <div className="w-full container-xl lg:container mx-auto text-center">
        <span className="text-lg mm:text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#FF6FCF] mb-6">Explore Unique </span>
        <span className="text-lg mm:text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">AI Characters</span>
        <div className="w-full py-6 px-10 mx-auto grid 4xl:grid-cols-6 3xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 mm:grid-cols-2 grid-cols-1 gap-8">
            {characters.map((character, index) => (
                <Card key={ index } item={ character }/>
            ))}
        </div>
    </div>
  )
}

export default CharacterCards