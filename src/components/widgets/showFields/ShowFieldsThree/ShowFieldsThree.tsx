// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './ShowFieldsThree.css';
import ShowField from '../ShowField/ShowField';
import { ShowFieldProps } from '../ShowField/interfaces';

type ShowFieldsThreeProps = {
  field1: ShowFieldProps;
  field2: ShowFieldProps;
  field3: ShowFieldProps;
};
const ShowFieldsThree: FC<ShowFieldsThreeProps> = (
  props: ShowFieldsThreeProps
) => {
  const { field1, field2, field3 } = props;

  return (
    <div className="show-fields-three">
      <ShowField field={field1.field} value={field1.value} />
      <ShowField field={field2.field} value={field2.value} />
      <ShowField field={field3.field} value={field3.value} />
    </div>
  );
};

export default ShowFieldsThree;
