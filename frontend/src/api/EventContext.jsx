import React, { createContext, useState, useEffect, useContext } from "react";

// Create the EventContext
export const EventContext = createContext();

// EventContext Provider Component
export const EventProvider = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerWidth);

  useEffect(() => {
    // Handler to update the width
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <EventContext.Provider value={{ screenWidth, screenHeight }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook for consuming the EventContext
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};
