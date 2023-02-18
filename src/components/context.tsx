import { createContext, useEffect, useReducer } from 'react';

import { AppContextModel, AppContextProps, AppReducer, Results } from './types';

import { TEXTRAZOR as TEXTRAZOR_API_KEY } from 'apiKeys';
import { ActionType } from './constants';

import { getFileLine } from 'helpers/file';
import { wrapPromise } from 'helpers/wrapPromise';
import appReducer from './reducer';

import TextRazor from 'services/TextRazor';

const tr = new TextRazor(TEXTRAZOR_API_KEY);

const defaultContextValues: AppContextModel = {
  results: { read: () => new Map() },
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
      const results = tr.getTextEntities(fileReader);
      dispatch([ActionType.setResults, wrapPromise<Results>(results)]);
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
