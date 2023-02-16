import { Dispatch } from 'react';
import { ActionType } from './App.constants';

export interface AppContextProps {
  children?: React.ReactNode;
}

export interface AppState {
  results: Result[];
}
export interface AppContextModel extends AppState {
  dispatch: Dispatch<AppAction>;
}

export interface Result {
  content: '';
}

export type SetResultsAction = [ActionType.setResults, Result[]];

export type AppAction = SetResultsAction;

export type AppReducer = (
  prevState: AppContextModel,
  action: AppAction
) => AppContextModel;
