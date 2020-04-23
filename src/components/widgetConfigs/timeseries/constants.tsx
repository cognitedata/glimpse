// Copyright 2020 Cognite AS
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Controller, Control } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * This holds time unit name and time unit short key mapping
 */
export const timeUnitMapping: { [key: string]: string } = {
  w: 'Week',
  d: 'Day',
  h: 'Hour',
  m: 'Minute',
  s: 'Second',
};

/**
 * This returns dynamic fields based on the input field name.
 * Constant form elements are mapped with a key in a object and return particular element based on the input.
 */
export const getDynamicFields = (fieldName: string, control: Control) => {
  const dynamicFields: { [key: string]: JSX.Element } = {
    start: start(control),
    granularity: granularity(control),
    elapsedTimeEnabler: elapsedTimeEnabler(control),
    timeDisplayKey: timeDisplayKey(control),
    maxPrecentageValue: maxPrecentageValue(control),
  };
  return dynamicFields[fieldName];
};

const start = (control: Control) => (
  <Grid key="start" item xs={6}>
    <FormLabel className="Parent-label" component="legend">
      Start Time
    </FormLabel>
    <Controller
      className="Start-input"
      as={
        <TextField type="number" inputProps={{ min: '0' }} variant="outlined" />
      }
      name="startValue"
      control={control}
    />
    <Controller
      className="StartUnit-input"
      as={
        <Select id="startUnit" variant="outlined">
          {Object.keys(timeUnitMapping).map(key => (
            <MenuItem key={key} value={key}>
              {timeUnitMapping[key]}(s) ago
            </MenuItem>
          ))}
        </Select>
      }
      name="startUnit"
      control={control}
    />
  </Grid>
);

const granularity = (control: Control) => (
  <Grid key="granularity" item xs={6}>
    <FormLabel className="Parent-label" component="legend">
      Granularity
    </FormLabel>
    <Controller
      className="Granularity-input"
      as={
        <TextField type="number" inputProps={{ min: '0' }} variant="outlined" />
      }
      name="granularityValue"
      control={control}
    />
    <Controller
      className="GranularityUnit-input"
      as={
        <Select id="granularityUnit" variant="outlined">
          {Object.keys(timeUnitMapping).map(key =>
            key !== 'w' ? (
              <MenuItem key={key} value={key}>
                {timeUnitMapping[key]}(s)
              </MenuItem>
            ) : null
          )}
        </Select>
      }
      name="granularityUnit"
      control={control}
    />
  </Grid>
);

const elapsedTimeEnabler = (control: Control) => (
  <Grid key="elapsedTimeEnabler" item xs={6}>
    <Controller
      className="switch"
      as={
        <FormControlLabel
          control={<Switch color="primary" />}
          label="Enable Elapsed Time"
          labelPlacement="start"
        />
      }
      name="elapsedTimeEnabler"
      control={control}
    />
  </Grid>
);

const timeDisplayKey = (control: Control) => (
  <Grid key="timeDisplayKey" item xs={6}>
    <Controller
      className="Text-field"
      label="Time Display Key"
      as={<TextField variant="outlined" required />}
      name="timeDisplayKey"
      control={control}
    />
  </Grid>
);

const maxPrecentageValue = (control: Control) => (
  <Grid key="maxPrecentageValue" item xs={6}>
    <Controller
      className="Text-field"
      label="Max Percentage Value"
      as={
        <TextField
          type="number"
          inputProps={{ min: '0' }}
          variant="outlined"
          required
        />
      }
      name="maxPrecentageValue"
      control={control}
    />
  </Grid>
);
