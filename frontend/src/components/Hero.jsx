import React from 'react'
import HeroFigure from './HeroFigure'


const Hero = ({ image }) => {
  return (
    <div>
        <div className="relative px-10 py-8 text-center">
            <HeroFigure
            imageSrc={image}
            imageAlt="Explore Aura"
            textContent={{
                title1: "Explore your",
                title2: "Aura",
                subtitle: "Create your Sweetest AI Companion",
            }}
            />
    </div>
    </div>
  )
}

export default Hero