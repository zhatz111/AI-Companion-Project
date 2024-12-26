import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, label, onClick, classes }) => {
  return (
    <div>
      <Link
        to={to || "#"} // Fallback to "#" if no `to` prop is provided
        onClick={(e) => {
          if (onClick) {
            onClick(e); // Execute the onClick function
          }
        }}
        className={`text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-xl px-2 py-1 ${classes}`}
      >
        {label}
      </Link>
    </div>
  );
};

export default Button;