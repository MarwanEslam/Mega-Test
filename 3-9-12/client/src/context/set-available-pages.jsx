// src/context/set-available-pages.jsx
import React, { createContext, useState } from 'react';

// Create the context
export const SetAvailablePagesContext = createContext();

// Create a provider component
export  const SetAvailablePagesProvider = ({ children }) => {
  const [availableHome, setAvailableHome] = useState(false);
  const [availableScore, setAvailableScore] = useState(false);
  const [availableExam, setAvailableExam] = useState(false);
  const [availableUserChoice, setAvailableUserChoice] = useState(false);
  return (
    <SetAvailablePagesContext.Provider
      value={{ setAvailableHome, availableHome, setAvailableExam, availableScore, availableExam, availableUserChoice, setAvailableScore, setAvailableUserChoice }}
    >
      {children}
    </SetAvailablePagesContext.Provider>
  );
};