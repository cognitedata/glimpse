// Copyright 2020 Cognite AS
import React from 'react';
import './addRemoveBtn.css';
/**
 * Return a widget with settins (adding remove button)
 */
export default (
  widgetId: string,
  onRemoveItem: Function,
  renderWidget: JSX.Element
) => {
  return (
    <>
      <button
        className="remove_button"
        type="button"
        onClick={() => onRemoveItem(widgetId)}
      >
        x
      </button>
      {renderWidget}
    </>
  );
};
