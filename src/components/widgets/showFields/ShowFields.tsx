// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './ShowFields.css';
import ShowField from './ShowField/ShowField';
import { ShowFieldProps } from './ShowField/interfaces';

type ShowFieldsProps = {
  fields: ShowFieldProps[];
};
/**
 * Used to display one or more property values of an object With custom names
 * @param props ShowFieldsProps
 */
const ShowFields: FC<ShowFieldsProps> = (props: ShowFieldsProps) => {
  const { fields } = props;

  const mapToShowFields = fields.map(showField => (
    <ShowField
      key={showField.label}
      label={showField.label}
      value={showField.value}
    />
  ));

  return <div className="show-fields-four">{mapToShowFields}</div>;
};

export default ShowFields;
