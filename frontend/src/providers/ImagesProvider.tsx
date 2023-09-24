import React, { createContext, useContext, useState, ReactNode } from "react";

type ImagesContextType = {
  imagesQuantity: number;
  setImagesQuantity: (quantity: number) => void;
};

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export const ImagesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [imagesQuantity, setImagesQuantity] = useState(0);

  return (
    <ImagesContext.Provider value={{ imagesQuantity, setImagesQuantity }}>
      {children}
    </ImagesContext.Provider>
  );
};

export const useImagesContext = (): ImagesContextType => {
  const context = useContext(ImagesContext);

  if (context === undefined) {
    throw new Error("useImagesContext must be used within an ImagesProvider");
  }

  return context;
};
