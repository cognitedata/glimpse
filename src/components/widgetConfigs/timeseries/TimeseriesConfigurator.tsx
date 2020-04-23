// Copyright 2020 Cognite AS
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './TimeseriesConfigurator.css';
import { RootAction } from 'StoreTypes';
import { bindActionCreators, Dispatch } from 'redux';

import { setAlerts } from 'store/actions/root-action';
import {
  FormValues,
  DefaultProps,
  QueryParams,
  ValueMapping,
} from './interfaces';
import { fetchTimeseries } from './timeseriesFetcher';
import { getDynamicFields, timeUnitMapping } from './constants';

/**
 * Base component for timeseries related widget configurators.
 */
export const TimeseriesConfigurator = (props: TimeseriesConfiguratorProps) => {
  const { onCreate, configFields } = props;
  const [timeseriesLoading, setTimeseriesLoading] = useState(false);

  const defaultValues: FormValues = {
    timeseriesExternalId: '',
    timeseriesName: '',
    timeseriesUnit: '',
    startValue: 2,
    startUnit: 'd',
    granularityValue: 4,
    granularityUnit: 'd',
    elapsedTimeEnabler: false,
    timeDisplayKey: '',
    maxPrecentageValue: 1,
  };

  const { handleSubmit, reset, control, getValues, setValue } = useForm({
    defaultValues,
  });

  /**
   * This activates when the Timeseries external id is entered and user leaves the text box.
   * This passes user entered timeseries external id and fetch timeseries data.
   * Timeseries name and unit is set in the form.
   * If there is no timeseries for the entered timeseries external id, it will show an alert.
   */
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

  /**
   *
   * This activated when user submit the form.
   * Return value is updated based on the required fields.
   */
  const onSubmit = (data: FormValues) => {
    const queryParams: QueryParams = {
      id: data.timeseriesExternalId,
    };

    const valueMapping: ValueMapping = {
      name: data.timeseriesName,
    };

    configFields.forEach(configField => {
      switch (configField) {
        case 'start':
          queryParams.start = `${data.startValue + data.startUnit}-ago`;
          queryParams.end = 'now';
          queryParams.limit = 1000;
          break;
        case 'granularity':
          queryParams.granularity =
            data.granularityValue + data.granularityUnit;
          break;
        case 'unit':
          valueMapping.unit = data.timeseriesUnit ? data.timeseriesUnit : '';
          break;
        case 'nameWithRange':
          valueMapping.nameWithRange = `${data.startValue} ${
            timeUnitMapping[data.startUnit]
          } ${data.timeseriesName}`;
          break;
        case 'elapsedTimeEnabler':
          valueMapping.isElapsedTimeEnabled = data.elapsedTimeEnabler;
          break;
        case 'timeDisplayKey':
          valueMapping.timeDisplayKey = data.timeDisplayKey;
          break;
        case 'maxPrecentageValue':
          valueMapping.maxPrecentageValue = data.maxPrecentageValue;
          break;
      }
    });

    const returnObj = {
      queryParams,
      valueMapping,
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
                as={
                  <TextField
                    id="timeseriesExternalId"
                    variant="outlined"
                    required
                  />
                }
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
                    id="timeseriesName"
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

            {/**
             *
             * This loads additional form fields dynamically
             */
            configFields.map(configField =>
              getDynamicFields(configField, control)
            )}
          </Grid>
        </section>
        <section>
          <div className="Button-holder">
            <Button
              className="Reset-button"
              data-testid="reset-button"
              color="primary"
              variant="contained"
              type="button"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button
              data-testid="create-button"
              variant="contained"
              color="primary"
              type="submit"
            >
              Create
            </Button>
          </div>
        </section>
      </Paper>
    </form>
  );
};

export const dispatchProps = {
  setAlerts,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

export type TimeseriesConfiguratorProps = ReturnType<
  typeof mapDispatchToProps
> &
  DefaultProps;
