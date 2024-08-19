import { createContext, useContext, useState, Dispatch, SetStateAction, FC, PropsWithChildren } from 'react';

export type SelectedChoicesProps = Record<string, string[]>;

interface QuestionContextType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedChoices: SelectedChoicesProps;
  setSelectedChoice: (name: string, choices: string[]) => void;
}


const Global = createContext<QuestionContextType | undefined>(undefined);


export const AppProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<SelectedChoicesProps>({});

  const setSelectedChoice = (name: string, choices: string[]) => {
    setSelectedChoices((prev) => ({ ...prev, [name]: choices }));
  };

  return (
    <Global.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedChoices,
        setSelectedChoice,
      }}
    >
      {children}
    </Global.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Global);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
