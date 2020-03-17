import React from 'react';
import CSS from 'csstype';
import { COMPONENTS } from 'constants/components';

type CompProps = {
  onRemoveItem: Function;
};

export default (key: string, compName: string, compProps: CompProps) => {
  if (COMPONENTS[compName] !== undefined) {
    return (
      <div key={key} data-testid={key}>
        <button
          type="button"
          style={removeStyle}
          onClick={() => compProps.onRemoveItem(key)}
        >
          x
        </button>
        {React.createElement(COMPONENTS[compName], {
          ...compProps,
        })}
      </div>
    );
  }
  return (
    <div key={key} data-testid={key}>
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
