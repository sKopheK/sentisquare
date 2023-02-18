import { createContext, useEffect, useReducer } from 'react';

import { AppContextModel, AppContextProps, AppReducer } from './types';

import { TEXTRAZOR as TEXTRAZOR_API_KEY } from 'apiKeys';

import { getFileLine } from 'helpers/file';
import appReducer from './reducer';

import TextRazor from 'services/TextRazor';
import { ActionType } from './constants';

const tr = new TextRazor(TEXTRAZOR_API_KEY);

const defaultContextValues: AppContextModel = {
  results: new Map(),
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

  useEffect(() => {
    const processData = async () => {
      const fileReader = getFileLine('data.txt');
      const results = await tr.getTextEntities(fileReader);
      dispatch([ActionType.setResults, results]);
    };
    processData();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
