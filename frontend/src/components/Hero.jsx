import React from 'react'
import HeroFigure from './HeroFigure'


const Hero = ({ image }) => {
  return (
      <div className="text-center">
          <HeroFigure
          imageSrc={image}
          imageAlt="Explore Aura"
          />
      </div>
  )
}

export default Hero