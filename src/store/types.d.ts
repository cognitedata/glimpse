// Copyright 2020 Cognite AS
declare module 'StoreTypes' {
  import { StateType, ActionType } from 'typesafe-actions';

  import { AppState } from './reducers/app';
  import { WidgetState } from './reducers/widget';
  import { AuthState } from './reducers/auth';

  export type RootState = {
    appState: AppState;
    authState: AuthState;
    widgetState: WidgetState;
  };

  export type RootAction = ActionType<
    typeof import('./actions/root-action').default
  >;
}
