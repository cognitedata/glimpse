import React from 'react';
import ShiftUtilization from 'components/ShiftUtilization/ShiftUtilization';

const Components: any = {
  shiftUtilization: ShiftUtilization,
};

export default (key: string, compName: string, props: any = {}) => {
  if (Components[compName] !== undefined) {
    return (
      <div key={key}>
        <button
          type="button"
          style={removeStyle}
          onClick={() => props.onRemoveItem(key)}
        >
          x
        </button>
        {React.createElement(Components[compName], {
          ...props,
        })}
      </div>
    );
  }
  return (
    <div key={key}>
      <button
        type="button"
        style={removeStyle}
        onClick={() => props.onRemoveItem(key)}
      >
        x
      </button>
    </div>
  );
};

const removeStyle: any = {
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
