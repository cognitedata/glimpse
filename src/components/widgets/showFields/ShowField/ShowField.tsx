// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './ShowField.css';
import { ShowFieldProps } from './interfaces';

const ShowField: FC<ShowFieldProps> = (props: ShowFieldProps) => {
  const { field, value } = props;
  return (
    <div className="show-field">
      <label className="field">{field}</label>
      <label className="value">{value}</label>
    </div>
  );
};

export default ShowField;
