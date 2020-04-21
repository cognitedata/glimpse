// Copyright 2020 Cognite AS
export type CustomFields = {
  fieldObj: FieldObj | null;
  customName: string;
};

export type FieldControl = {
  fields: CustomFields[];
};

export type FieldObj = {
  field: string;
  type: string;
  path: string;
};
