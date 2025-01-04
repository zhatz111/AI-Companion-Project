import React from 'react'
import HeroText from './HeroText'

const HeroFigure = ({ imageSrc, imageAlt, textContent }) => {
  return (
    <div>
        <figure className="relative items-center justify-center">
            <img
                className="w-full object-contain rounded-lg shadow-lg"
                src={imageSrc}
                alt={imageAlt}
            />
            {/* <HeroText {...textContent} /> */}
        </figure>
    </div>
  )
}

export default HeroFigure