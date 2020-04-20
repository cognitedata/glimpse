// Copyright 2020 Cognite AS
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { fetchTimeseries } from './tsFetcher';
import './TimeseriesConfigurator.css';
import { FormValues, DefaultProps } from './interfaces';
import { RootAction } from 'StoreTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { setAlerts } from 'store/actions/root-action';

const timeUnitMapping: { [key: string]: string } = {
  w: 'Week',
  d: 'Day',
  h: 'Hour',
  m: 'Minute',
  s: 'Second',
};

/**
 * Events widgets configuration
 */
const TimeseriesConfigurator = (props: Props) => {
  const { onCreate } = props;
  const [timeseriesLoading, setTimeseriesLoading] = useState(false);

  const defaultValues: FormValues = {
    timeseriesExternalId: '',
    timeseriesName: '',
    timeseriesUnit: '',
    startValue: 2,
    startUnit: 'd',
    granularityValue: 4,
    granularityUnit: 'd',
  };

  const { handleSubmit, reset, control, getValues, setValue } = useForm({
    defaultValues,
  });

  const onTsExternalIdBlur = async () => {
    if (getValues().timeseriesExternalId) {
      setTimeseriesLoading(true);
      const timeseries = await fetchTimeseries(
        getValues().timeseriesExternalId
      );
      if (timeseries) {
        setValue('timeseriesName', timeseries.name);
        setValue('timeseriesUnit', timeseries.unit);
      } else {
        setValue('timeseriesName', '');
        setValue('timeseriesUnit', '');
        props.setAlerts({
          type: 'warning',
          text: 'Timeseries not found!',
          hideApp: false,
        });
      }
      setTimeseriesLoading(false);
    }
  };

  const onSubmit = (data: FormValues) => {
    const returnObj = {
      queryParams: {
        id: data.timeseriesExternalId,
        start: data.startValue + data.startUnit + '-ago',
        end: 'now',
        granularity: data.granularityValue + data.granularityUnit,
        limit: 1000,
      },
      valueMapping: {
        name: data.timeseriesName,
        title:
          data.startValue +
          ' ' +
          timeUnitMapping[data.startUnit] +
          ' ' +
          data.timeseriesName,
        unit: data.timeseriesUnit ? data.timeseriesUnit : '',
      },
    };
    onCreate(returnObj);
  };

  return (
    <form className="TimeseriesConfigurator" onSubmit={handleSubmit(onSubmit)}>
      <Paper variant="outlined" className="paperbox">
        <section>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Controller
                className="Text-field"
                label="Timeseries External Id"
                as={<TextField variant="outlined" required />}
                name="timeseriesExternalId"
                control={control}
                onBlur={onTsExternalIdBlur}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                className="Text-field"
                label="Timeseries Name"
                as={
                  <TextField
                    variant="outlined"
                    disabled={timeseriesLoading}
                    required
                  />
                }
                name="timeseriesName"
                control={control}
              />
              {timeseriesLoading ? (
                <CircularProgress
                  className="Timeseries-loader"
                  color="secondary"
                />
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <FormLabel className="Parent-label" component="legend">
                {' '}
                Start Time{' '}
              </FormLabel>
              <Controller
                className="Start-input"
                as={
                  <TextField
                    type="number"
                    inputProps={{ min: '0' }}
                    variant="outlined"
                  />
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
            <Grid item xs={6}>
              <FormLabel className="Parent-label" component="legend">
                {' '}
                Granularity{' '}
              </FormLabel>
              <Controller
                className="Granularity-input"
                as={
                  <TextField
                    type="number"
                    inputProps={{ min: '0' }}
                    variant="outlined"
                  />
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
          </Grid>
        </section>
        <section>
          <div className="Button-holder">
            <Button
              className="Reset-button"
              color="primary"
              variant="contained"
              type="button"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </div>
        </section>
      </Paper>
    </form>
  );
};

const dispatchProps = {
  setAlerts,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapDispatchToProps> & DefaultProps;

export default connect(null, dispatchProps)(TimeseriesConfigurator);
