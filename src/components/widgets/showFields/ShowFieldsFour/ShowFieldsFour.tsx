import React, { FC } from 'react';
import './ShowFieldsFour.css';
import ShowField from '../ShowField/ShowField';
import { ShowFieldProps } from '../ShowField/interfaces';

type ShowFieldsFourProps = {
  field1: ShowFieldProps;
  field2: ShowFieldProps;
  field3: ShowFieldProps;
  field4: ShowFieldProps;
};
const ShowFieldsFour: FC<ShowFieldsFourProps> = (
  props: ShowFieldsFourProps
) => {
  const { field1, field2, field3, field4 } = props;

  return (
    <div className="show-fields-three">
      <ShowField field={field1.field} value={field1.value} />
      <ShowField field={field2.field} value={field2.value} />
      <ShowField field={field3.field} value={field3.value} />
      <ShowField field={field4.field} value={field4.value} />
    </div>
  );
};

export default ShowFieldsFour;
