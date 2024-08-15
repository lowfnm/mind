import React, { createContext, useContext, useState, ReactNode } from "react";

export type SelectedChoicesProps = Record<string, string[]>;

interface QuestionContextType {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectedChoices: SelectedChoicesProps;
  setSelectedChoice: (name: string, choices: string[]) => void;
}


const AppContext = createContext<QuestionContextType | undefined>(undefined);


export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<SelectedChoicesProps>({});

  const setSelectedChoice = (name: string, choices: string[]) => {
    setSelectedChoices((prev) => ({ ...prev, [name]: choices }));
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedChoices,
        setSelectedChoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
