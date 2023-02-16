import { createContext, useReducer } from 'react';

import { AppContextModel, AppContextProps, AppReducer } from './App.types';

import appReducer from './App.reducer';

const defaultContextValues: AppContextModel = {
  results: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
};

export const AppContext = createContext(defaultContextValues);

const AppContextProvider: React.FC<AppContextProps> = (
  props: AppContextProps
): JSX.Element => {
  const [state, dispatch] = useReducer<AppReducer>(
    appReducer,
    defaultContextValues
  );

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
