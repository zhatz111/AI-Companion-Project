import React from 'react'

const Button = ({ href, label, classes }) => {
  return (
    <div>
        <a
            href={href}
            className={`text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-full px-2 py-1 ${classes}`}
        >
            {label}
        </a>
    </div>
  )
}

export default Button