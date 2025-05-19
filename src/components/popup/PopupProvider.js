import { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popupOpen, setPopupOpen] = useState(false);

  const contextValue = {
    popupOpen,
    setPopupOpen
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);
