import React from 'react'
import HeroFigure from './HeroFigure'


const Hero = ({ image }) => {
  return (
      <div className="mx-4">
          <HeroFigure
          imageSrc={image}
          imageAlt="Explore Aura"
          />
      </div>
  )
}

export default Hero