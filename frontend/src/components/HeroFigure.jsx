import React from 'react'

const HeroFigure = ({ imageSrc, imageAlt }) => {
  return (
    <div className='m-5 aspect-auto'>
        <figure className="">
            <img
                className="w-full rounded-lg sm:rounded-2xl m-auto"
                src={imageSrc}
                alt={imageAlt}
            />
        </figure>
    </div>

  )
}

export default HeroFigure