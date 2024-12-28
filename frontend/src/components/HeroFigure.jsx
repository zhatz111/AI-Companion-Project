import React from 'react'
import HeroText from './HeroText'

const HeroFigure = ({ imageSrc, imageAlt, textContent }) => {
  return (
    <div>
        <figure className="relative items-center justify-center">
            <a href="#">
            <img
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                src={imageSrc}
                alt={imageAlt}
            />
            </a>
            <HeroText {...textContent} />
        </figure>
    </div>
  )
}

export default HeroFigure