import React from 'react'

const HeroText = ({ title1, title2, subtitle }) => {
  return (
    <div>
        <figcaption className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 rounded-lg">
            <span className="lg:my-2 text-md mm:text-lg sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white">
            {title1}
            </span>
            <span className="text-md mm:text-lg sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#FF6FCF]">
            {title2}
            </span>
            <p className="lg:my-2 text-sm mm:text-md sm:text-2xl lg:text-3xl xl:text-4xl text-white">
            {subtitle}
            </p>
        </figcaption>
    </div>
  )
}

export default HeroText