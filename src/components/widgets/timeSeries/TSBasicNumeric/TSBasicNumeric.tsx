// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './TSBasicNumeric.css';
import { roundValue } from 'utils/utils';
import { TSBasicNumericProps } from './interfaces';

/**
 * Display custom timeseries name and a numeric value with the unit.
 * @param props TSBasicNumericProps
 */
const TSBasicNumeric: FC<TSBasicNumericProps> = (
  props: TSBasicNumericProps
) => {
  const { name, value, unit } = props;
  const roundedVal = roundValue(value);
  return (
    <div className="basic-numeric">
      <div className="name" title={name}>
        {name}
      </div>
      <div className="value-unit" title={`${roundedVal}${unit}`}>
        {roundedVal}
        <div className="unit">{unit}</div>
      </div>
    </div>
  );
};

export default TSBasicNumeric;
