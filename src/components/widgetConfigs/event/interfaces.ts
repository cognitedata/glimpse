// Copyright 2020 Cognite AS
import { FieldMapping } from 'constants/widgetSettings';
import { ShowFieldProps } from 'components/widgets/showFields/ShowField/interfaces';

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

export type ValueMapping = {
  fields: FieldMapping[];
};
export type EventConfReturn = {
  queryParams: FetchEvent;
  valueMapping: ValueMapping;
};
