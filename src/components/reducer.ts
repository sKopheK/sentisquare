import { ActionType } from './constants';
import { AppReducer } from './types';

const appReducer: AppReducer = (state, [type, payload]) => {
  switch (type) {
    case ActionType.setResults:
      return {
        ...state,
        results: payload,
      };
  }
};

export default appReducer;
