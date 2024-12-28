import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Button = ({ to, label, onClick, classes }) => {
  const location = useLocation();
  return (
    <div>
      <Link
        to={location.pathname} // Fallback to "#" if no `to` prop is provided
        onClick={(e) => {
          if (onClick) {
            onClick(e); // Execute the onClick function
          }
          e.preventDefault();
        }}
        className={`text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-xl px-2 py-1 ${classes}`}
      >
        {label}
      </Link>
    </div>
  );
};

export default Button;