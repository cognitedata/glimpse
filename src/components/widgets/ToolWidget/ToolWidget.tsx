// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import './ToolWidget.css';
import { ShowFieldProps } from '../showFields/ShowField/interfaces';
import ShowField from '../showFields/ShowField/ShowField';

type Toolwidget = ShowFieldProps & {
  name: string;
};

const ToolWidget: FC<Toolwidget> = (props: Toolwidget) => {
  const { label, value, name } = props;
  return (
    <div className="tool-widget">
      <label className="name">{name}</label>
      <ShowField label={value} value={label} />
    </div>
  );
};

export default ToolWidget;
