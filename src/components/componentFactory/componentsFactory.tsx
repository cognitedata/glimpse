import React from 'react';
import ShiftUtilization from 'components/ShiftUtilization/ShiftUtilization';
import CSS from 'csstype';

const Components: any = {
  shiftUtilization: ShiftUtilization,
};

type CompProps = {
  onRemoveItem: Function;
};

export default (key: string, compName: string, compProps: CompProps) => {
  if (Components[compName] !== undefined) {
    return (
      <div key={key}>
        <button
          type="button"
          style={removeStyle}
          onClick={() => compProps.onRemoveItem(key)}
        >
          x
        </button>
        {React.createElement(Components[compName], {
          ...compProps,
        })}
      </div>
    );
  }
  return (
    <div key={key}>
      <button
        type="button"
        style={removeStyle}
        onClick={() => compProps.onRemoveItem(key)}
      >
        x
      </button>
    </div>
  );
};

const removeStyle: CSS.Properties = {
  position: 'absolute',
  right: '2px',
  top: 0,
  background: 'none',
  border: 'none',
  margin: 0,
  padding: 0,
  fontSize: '25px',
  cursor: 'pointer',
  color: '#b31616',
};
