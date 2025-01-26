import React from 'react'

const HeroFigure = ({ imageSrc, imageAlt }) => {
  return (
    <div className='my-2 mx-auto'>
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