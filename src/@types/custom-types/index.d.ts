// Copyright 2020 Cognite AS
declare module 'custom-types' {
  export type Capability = {
    [key: string]: {
      actions: string[];
    };
  };

  export type UserInfo = {
    name: string;
    admin: boolean;
  };
}
