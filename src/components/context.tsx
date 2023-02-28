import { FC, createContext, useEffect } from 'react';

import { AppAction, AppContextModel, AppContextProps, AppState } from './types';

import { TEXTRAZOR as TEXTRAZOR_API_KEY } from 'apiKeys';
import { ActionType, defaultState } from './constants';

import { getFileLine } from 'helpers/file';
import { wrapPromise } from 'helpers/wrapPromise';
import appReducer from './reducer';

import useMiddlewareReducer from 'hooks/useMiddlewareReducer';
import { Middleware } from 'hooks/useMiddlewareReducer/types';
import TextRazor from 'services/TextRazor';

const textRazor = new TextRazor(TEXTRAZOR_API_KEY);

const defaultContextValues: AppContextModel = {
  ...defaultState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
};

export const AppContext = createContext(defaultContextValues);

const AppContextProvider: FC<AppContextProps> = (props: AppContextProps) => {
  const appMiddleware: Middleware<AppState, AppAction> =
    ({ getState }) =>
    (next) =>
    async (action) => {
      const [type] = action;
      const state = getState();
      switch (type) {
        case ActionType.loadMore:
          if (!state.hasMoreResults) break;
          const text = state.fileContent[Object.keys(state.results).length];
          next([
            ActionType.addResults,
            [text, wrapPromise(textRazor.getTextEntities(text))],
          ]);
          return;
      }
      return next(action);
    };
  const [state, dispatch] = useMiddlewareReducer<AppState, AppAction>(
    appReducer,
    defaultContextValues,
    [appMiddleware]
  );

  useEffect(() => {
    const processData = async () => {
      // TEMP
      const fileReader = getFileLine('data.txt');
      const content = [];
      for await (const line of fileReader) {
        content.push(line.trim());
      }
      dispatch([ActionType.setFileContent, content]);
    };
    processData();
  }, []);

  const contextValue = { ...state, dispatch };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
