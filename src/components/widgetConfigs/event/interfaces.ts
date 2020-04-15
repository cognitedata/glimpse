// Copyright 2020 Cognite AS
export type FieldObj = {
  field: string;
  type: string;
  path: string;
};

export type CustomFields = {
  fieldObj: FieldObj | null;
  customName: string;
};

export type EventConfigData = FetchEvent & {
  fields: CustomFields[];
};

export type FetchEvent = {
  ongoing: boolean;
  type: string;
  subtype: string;
};
