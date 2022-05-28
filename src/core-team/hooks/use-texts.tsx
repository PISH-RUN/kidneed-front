import { createContext, FC, useContext } from "react";
import { useStaticTexts } from "../api/contsants";

export const TextsContext = createContext<any>({});

export const TextsProvider: FC = ({ children }) => {
  const { data } = useStaticTexts();

  const getText = (key: string) => {
    return data?.data?.find((i: any) => i.attributes.key === key)?.attributes?.value;
  };

  return (
    <TextsContext.Provider
      value={{
        data: data?.data,
        getText
      }}
    >
      {children}
    </TextsContext.Provider>
  );
};

export const useTexts = () => {
  return useContext(TextsContext);
};