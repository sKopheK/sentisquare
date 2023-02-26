import { AppReducer } from './types';

import { ActionType } from './constants';

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
      return {
        ...state,
        results: [...state.results, [key, value]],
      };
    case ActionType.setResults:
      return {
        ...state,
        results: payload,
      };
    case ActionType.setHasMoreResults:
      return {
        ...state,
        hasMoreResults: payload,
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
  }

  return state;
};

export default appReducer;
