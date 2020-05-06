// Copyright 2020 Cognite AS
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
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
      <IconButton
        className="remove_button"
        edge="end"
        aria-label="delete"
        onClick={() => onRemoveItem(widgetId)}
      >
        <CancelIcon />
      </IconButton>
      {renderWidget}
    </>
  );
};
