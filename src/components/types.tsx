import { Dispatch } from 'react';

import { WrappedPromise } from 'helpers/wrapPromise';
import { ActionType } from './constants';

export interface AppContextProps {
  children?: React.ReactNode;
}

export interface NlpEntity extends Record<string, any> {
  id: number;
  entityId: string;
  type?: string[];
  confidenceScore: number;
  relevanceScore: number;
  wikiLink: string;
  startingPos: number;
  matchedText: string;
}

export type ResultDataType = NlpEntity[] | string;
export type ResultData = WrappedPromise<ResultDataType>;
export type Result = [string, ResultData];
export type ResultList = Result[];

export interface AppState {
  results: ResultList;
  hasMoreResults: boolean;
  fileContent: string[];
}
export interface AppContextModel extends AppState {
  dispatch: Dispatch<AppAction>;
}

export type AddResults = [ActionType.addResults, Result];
export type SetResultsAction = [ActionType.setResults, AppState['results']];
export type LoadMoreAction = [ActionType.loadMore];
export type SetAllAction = [ActionType.setAll, Partial<AppState>];
export type ReplaceLastErrorAction = [ActionType.replaceLastError, string];
export type SetFileContentAction = [ActionType.setFileContent, string[]];
export type ResetAction = [ActionType.reset];

export type AppAction =
  | AddResults
  | SetResultsAction
  | LoadMoreAction
  | SetAllAction
  | ReplaceLastErrorAction
  | SetFileContentAction
  | ResetAction;

export type AppReducer = (prevState: AppState, action: AppAction) => AppState;
