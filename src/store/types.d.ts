// Copyright 2020 Cognite AS
declare module 'StoreTypes' {
  import { StateType, ActionType } from 'typesafe-actions';

  export type RootState = StateType<
    ReturnType<typeof import('./reducers/root-reducer').default>
  >;
  export type RootAction = ActionType<
    typeof import('./actions/root-action').default
  >;
}
