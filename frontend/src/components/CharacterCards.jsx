import React, { useContext, useEffect } from 'react';
import Card from './Card';
import aiCharacters from '../data/characters';
import { CharacterContext } from '../api/CharacterContext';
import { useNavigate } from 'react-router-dom';

const CharacterCards = ({ gender }) => {
  const { characters, setCharacters, setCurrentCharacter } = useContext(CharacterContext);
  const navigate = useNavigate();

  // Set the characters into context when the component loads
  useEffect(() => {
      setCharacters(aiCharacters);
  }, [setCharacters]);

  const handleCardClick = (character) => {
      setCurrentCharacter(character)
      const itemId = character.name.replace(/ /g, '-').toLowerCase(); // Use `character` instead of `item`
      navigate(`/chat/${itemId}`, { state: character }); // Pass the correct path and state
  };


  return (
    <div className="w-full mx-auto">
        {/* <span className="text-md mm:text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-[#FF6FCF] mb-6">Explore Unique </span>
        <span className="text-md mm:text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">AI Characters</span> */}
        <div className="object-scale-down px-6 mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8">
        {characters
          .filter(character => character.gender === gender) // Filter by gender
          .map((character, index) => (
            <Card 
              key={index} 
              item={character} 
              onClick={() => handleCardClick(character)} 
            />
        ))}
        </div>
    </div>
  )
}

export default CharacterCards