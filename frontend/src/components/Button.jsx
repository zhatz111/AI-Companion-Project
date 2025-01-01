import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, onClick, classes, to }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      if (!to) e.preventDefault(); // Prevent navigation if no `to`
    }
  };

  return to ? (
    <Link
      to={to}
      onClick={handleClick}
      className={`text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-xl px-2 py-1 ${classes}`}
    >
      {label}
    </Link>
  ) : (
    <button
      onClick={handleClick}
      className={`text-[#FF6FCF] text-sm sm:text-lg hover:bg-[#FF6FCF] hover:text-white border-solid border border-[#FF6FCF] rounded-xl px-2 py-1 ${classes}`}
    >
      {label}
    </button>
  );
};

export default Button;
