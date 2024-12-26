import React from 'react'
import HeroText from './HeroText'

const HeroFigure = ({ imageSrc, imageAlt, textContent }) => {
  return (
    <div>
        <figure className="relative mx-auto group">
            <a href="#">
            <img
                className="w-full h-106 object-cover object-top rounded-lg shadow-lg"
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