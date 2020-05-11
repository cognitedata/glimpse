// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './TSBasicNumeric.css';
import { TSBasicNumericProps } from './interfaces';

/**
 * Display custom timeseries name and a numeric value with the unit.
 * @param props TSBasicNumericProps
 */
const TSBasicNumeric: FC<TSBasicNumericProps> = (
  props: TSBasicNumericProps
) => {
  const { name, value, unit } = props;

  const isFloat = (n: number | string) => {
    return Number(n) === n && n % 1 !== 0;
  };

  const roundValue = (value: string | number) =>
    isFloat(value) ? Number(value).toFixed(2) : value;

  return (
    <div className="basic-numeric">
      <div className="name" title={name}>
        {name}
      </div>
      <div className="value-unit" title={`${roundValue(value)}${unit}`}>
        {roundValue(value)}
        <div className="unit">{unit}</div>
      </div>
    </div>
  );
};

export default TSBasicNumeric;
