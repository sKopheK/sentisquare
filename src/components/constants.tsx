import { AppState } from './types';

export enum ActionType {
  addResults = 'addResults',
  setResults = 'setResults',
  loadMore = 'loadMore',
  setAll = 'setAll',
  replaceLastError = 'replaceLastError',
  setFileContent = 'setFileContent',
  reset = 'reset',
}

export const defaultState: AppState = {
  fileContent: [],
  results: [],
  hasMoreResults: false,
};
