// Copyright 2020 Cognite AS
import { CustomFields } from '../common/interfaces';

export type DefaultProps = {
  onCreate: Function;
};

export type FormValues = {
  fields: CustomFields[];
};
