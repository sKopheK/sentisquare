import { ActionType } from './App.constants';
import { AppReducer } from './App.types';

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
