// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './ShowField.css';
import moment from 'moment';
import { ShowFieldProps } from './interfaces';

/**
 * Used to display one propertie value of an object With custom name.
 * @param props ShowFieldProps
 */
const ShowField: FC<ShowFieldProps> = (props: ShowFieldProps) => {
  const { label, value, path } = props;
  /**
   * format returning object based on the input object type.
   * @param valueProp any
   */
  const formatValueByType = (valueProp: any) => {
    if (!valueProp) {
      return ' - ';
    }
    // if substring 'time' contains in the path it should be a time
    if (
      path &&
      new RegExp(/(time|date)/gi).test(path) &&
      new Date(valueProp).getTime() > 0
    ) {
      return moment(valueProp).format('YYYY-MM-DD HH:mm:ss');
    }
    if (typeof valueProp === 'object') {
      return JSON.stringify(valueProp);
    }
    if (isFloat(valueProp)) {
      return Number(valueProp).toFixed(2);
    }
    return valueProp;
  };

  const isFloat = (n: number | string) => {
    return Number(n) === n && n % 1 !== 0;
  };

  return (
    <div className="show-field">
      <span className="field">{label}</span>
      <span className="value">{formatValueByType(value)}</span>
    </div>
  );
};

export default ShowField;
