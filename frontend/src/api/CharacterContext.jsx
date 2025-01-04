import React, { createContext, useEffect, useState } from 'react';

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState(() => {
        const savedCharacter = localStorage.getItem('currentCharacter');
        return savedCharacter ? JSON.parse(savedCharacter) : null;
    });

    useEffect(() => {
        if (currentCharacter) {
        localStorage.setItem('currentCharacter', JSON.stringify(currentCharacter));
        }
    }, [currentCharacter]);

    return (
        <CharacterContext.Provider value={{ characters, setCharacters, currentCharacter, setCurrentCharacter }}>
            {children}
        </CharacterContext.Provider>
    );
};
