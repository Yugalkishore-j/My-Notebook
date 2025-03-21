import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => {
      setAlert(null);
    }, 3000); // Hide the alert after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};