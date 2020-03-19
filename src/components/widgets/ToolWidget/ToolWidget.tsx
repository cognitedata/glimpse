import React, { FC } from 'react';
import './ToolWidget.css';
import { ShowFieldProps } from '../showFields/ShowField/interfaces';
import ShowField from '../showFields/ShowField/ShowField';

type Toolwidget = ShowFieldProps & {
  name: string;
};

const ToolWidget: FC<Toolwidget> = (props: Toolwidget) => {
  const { field, value, name } = props;
  return (
    <div className="tool-widget">
      <label className="name">{name}</label>
      <ShowField field={value} value={field} />
    </div>
  );
};

export default ToolWidget;
