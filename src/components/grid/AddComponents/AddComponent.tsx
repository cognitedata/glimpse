import React, { useState } from 'react';
import './AddComponent.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default (props: any) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  return (
    <>
      <div className="block_container">
        <div className="inline">
          <TextField
            label="Height"
            required
            type="number"
            onChange={e => setHeight(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="inline">
          <TextField
            label="Width"
            required
            type="number"
            onChange={e => setWidth(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="inline center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.addElement(height, width)}
          >
            ADD COMPONENT
          </Button>
        </div>
      </div>
    </>
  );
};
