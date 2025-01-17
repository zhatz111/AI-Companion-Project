import React from 'react'

const HeroFigure = ({ imageSrc, imageAlt }) => {
  return (
    <div className='mx-5 my-2 aspect-auto'>
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