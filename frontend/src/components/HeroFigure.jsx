import React from 'react'
import HeroText from './HeroText'

const HeroFigure = ({ imageSrc, imageAlt }) => {
  return (
    <div className='m-6'>
        <figure className="">
            <img
                className="w-full rounded-2xl m-auto"
                src={imageSrc}
                alt={imageAlt}
            />
        </figure>
    </div>

  )
}

export default HeroFigure