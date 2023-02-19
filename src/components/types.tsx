import { Dispatch } from 'react';

import { WrappedPromise } from 'helpers/wrapPromise';
import { ActionType } from './constants';

export interface AppContextProps {
  children?: React.ReactNode;
}

export interface AppState {
  results: WrappedPromise<Results>;
}
export interface AppContextModel extends AppState {
  dispatch: Dispatch<AppAction>;
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

export type Results = Map<string, NlpEntity[]>;

export type SetResultsAction = [ActionType.setResults, WrappedPromise<Results>];

export type AppAction = SetResultsAction;

export type AppReducer = (
  prevState: AppContextModel,
  action: AppAction
) => AppContextModel;
