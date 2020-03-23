import React, { FC } from 'react';
import './TSBasicNumeric.css';

type TSBasicNumericProps = {
  name: string;
  value: number;
  unit: string;
};
/**
 * Display custom timeseries name and a numeric value with the unit.
 * @param props TSBasicNumericProps
 */
const TSBasicNumeric: FC<TSBasicNumericProps> = (
  props: TSBasicNumericProps
) => {
  const { name, value, unit } = props;

  return (
    <div className="basic-numeric">
      <label className="name">{name}</label>
      <div className="val-unit">
        <label className="value">{value}</label>
        <label className="unit">{unit}</label>
      </div>
    </div>
  );
};

export default TSBasicNumeric;
