// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './ShowField.css';
import { ShowFieldProps } from './interfaces';

const ShowField: FC<ShowFieldProps> = (props: ShowFieldProps) => {
  const { field, value } = props;
  return (
    <div className="show-field">
      <span className="field">{field}</span>
      <span className="value">{value}</span>
    </div>
  );
};

export default ShowField;
