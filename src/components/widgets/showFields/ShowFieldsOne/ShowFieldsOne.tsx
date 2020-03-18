import React, { FC } from 'react';
import './ShowFieldsOne.css';
import ShowField from '../ShowField/ShowField';
import { ShowFieldProps } from '../ShowField/interfaces';

type ShowFieldsOneProps = {
  field1: ShowFieldProps;
};
const ShowFieldsOne: FC<ShowFieldsOneProps> = (props: ShowFieldsOneProps) => {
  const { field, value } = props.field1;
  return (
    <div className="show-fields-one">
      <ShowField field={field} value={value} />
    </div>
  );
};

export default ShowFieldsOne;
