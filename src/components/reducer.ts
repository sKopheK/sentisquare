import { AppReducer, ResultList } from './types';

import { ActionType, defaultState } from './constants';

import { wrapPromise } from 'helpers/wrapPromise';

const appReducer: AppReducer = (state, [type, payload]) => {
  switch (type) {
    case ActionType.setAll:
      return {
        ...state,
        ...payload,
      };
    case ActionType.addResults:
      const [key, value] = payload;
      const updatedResults: ResultList = [...state.results, [key, value]];
      return {
        ...state,
        results: updatedResults,
        hasMoreResults:
          Object.keys(updatedResults).length < state.fileContent.length,
      };
    case ActionType.setResults:
      return {
        ...state,
        results: payload,
        hasMoreResults: Object.keys(payload).length < state.fileContent.length,
      };
    case ActionType.replaceLastError:
      const results = [...state.results];
      const lastError = results.pop();
      if (lastError === undefined) break;
      return {
        ...state,
        results: [
          ...results,
          [lastError[0], wrapPromise(Promise.resolve(payload))],
        ],
      };
    case ActionType.setFileContent:
      return {
        ...state,
        fileContent: payload,
        results: [],
        hasMoreResults: payload.length > 0,
      };
    case ActionType.reset:
      return {
        ...defaultState,
      };
  }

  return state;
};

export default appReducer;
