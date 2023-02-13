import { createContext } from 'react';
import { AppContextModel, AppContextProps } from './App.types';

const defaultContextValues: AppContextModel = {};

export const AppContext = createContext(defaultContextValues);

const AppContextProvider: React.FC<AppContextProps> = (
  props: AppContextProps
): JSX.Element => {
  const contextModel: AppContextModel = {};

  return (
    <AppContext.Provider value={contextModel}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
