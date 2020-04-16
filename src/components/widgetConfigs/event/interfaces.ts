// Copyright 2020 Cognite AS
import { FieldMapping } from 'constants/widgetSettings';

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

export type WidgetConfigProps = {
  onCreate: Function;
};

export type EventWidgetConfigProps = WidgetConfigProps & {
  noOfFields: number;
};
