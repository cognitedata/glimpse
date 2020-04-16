// Copyright 2020 Cognite AS
import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller, OnSubmit } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import keysIn from 'lodash/keysIn';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, Paper } from '@material-ui/core';
import { CogniteEvent } from '@cognite/sdk';
import { removeObjects } from 'utils/utils';
import fill from 'lodash/fill';
import Grid from '@material-ui/core/Grid';
import { fetchEvents } from './eventFetcher';
import Fields from './Fields';
import './Configurator.css';
import {
  FieldObj,
  EventConfigData,
  FetchEvent,
  EventConfReturn,
} from './interfaces';

/**
 * Events widgets configuration
 */
type WidgetConfigProps = {
  clickSumbmitCount?: number;
  onCreate?: Function;
};

type EventWidgetConfigProps = WidgetConfigProps & {
  noOfFields: number;
};

const EventMeta = (props: EventWidgetConfigProps) => {
  const { clickSumbmitCount, onCreate, noOfFields } = props;
  const excludeFieldsArr = ['metadata', 'assetIds', 'type', 'subtype'];
  const [fields, setFields] = useState<FieldObj[]>([]);
  const [isErrFetching, setIsErrFetching] = useState(false);
  const defaultValues: EventConfigData = {
    ongoing: false,
    type: '***',
    subtype: 'VAL',
    fields: fill(Array(noOfFields), { fieldObj: null, customName: '' }),
  };

  const { handleSubmit, reset, errors, watch, control, getValues } = useForm({
    defaultValues,
  });

  const onSubmit: OnSubmit<EventConfigData> = data => {
    console.dir(data);
    const { type, subtype, ongoing } = data;
    const returnObj = {} as EventConfReturn;
    returnObj.queryParams = { type, subtype, ongoing };
    returnObj.valueMapping = {
      fields: data.fields.map(field => ({
        key: field.fieldObj?.path,
        label: field.customName,
      })),
    };
    console.dir(returnObj);
    if (onCreate) {
      onCreate(returnObj);
    }
  };

  const onCreateClicked = () => {
    if (fields.length === 0) {
      setIsErrFetching(true);
    } else handleSubmit(onSubmit)();
  };

  // fired when clickSumbmitCount changed (neglect the first render cycle)
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    onCreateClicked();
    console.log('fired');
  }, [clickSumbmitCount]);

  const fetchEventsArr = async (data: FetchEvent) => {
    const fetchedData = await fetchEvents(data);
    if (fetchedData.length > 0) {
      setIsErrFetching(false);
      setFields(generateFieldObjs(fetchedData[0]));
    } else {
      setIsErrFetching(true);
    }
  };

  const resetForm = () => {
    setFields([]);
    reset();
  };
  /**
   * generate fieldObject array based on the keys on an event
   * @param event
   */
  const generateFieldObjs = (event: CogniteEvent): FieldObj[] => {
    const fieldsArray: FieldObj[] = [];
    const fieldsArr = removeObjects(
      keysIn(event),
      excludeFieldsArr
    ).sort((a, b) => a.localeCompare(b));

    const metaFields = keysIn(event.metadata).sort((a, b) =>
      a.localeCompare(b)
    );

    fieldsArr.forEach(field =>
      fieldsArray.push({ field, type: 'Fields', path: field })
    );
    metaFields.forEach(field =>
      fieldsArray.push({
        field,
        type: 'Meta Fields',
        path: `metadata.${field}`,
      })
    );
    return fieldsArray;
  };

  const watchFields = watch('fields');
  const selectedFields = watchFields
    ? watchFields.map(field => field.fieldObj)
    : [];
  const filteredFields = removeObjects(fields, selectedFields);
  return (
    <form className="event_config">
      <Paper variant="outlined" className="paperbox">
        <section className={fields.length > 0 ? 'event_details_disabled' : ''}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Controller
                className="textField"
                as={
                  <TextField
                    variant="outlined"
                    label="Type"
                    disabled={fields.length > 0}
                    placeholder="Event Type"
                  />
                }
                name="type"
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                className="textField"
                as={
                  <TextField
                    label="Subtype"
                    variant="outlined"
                    disabled={fields.length > 0}
                    placeholder="Event Subtype"
                  />
                }
                name="subtype"
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                className="switch"
                as={
                  <FormControlLabel
                    control={
                      <Switch color="primary" disabled={fields.length > 0} />
                    }
                    label="Is Ongoing"
                    labelPlacement="start"
                  />
                }
                name="ongoing"
                control={control}
              />
            </Grid>
          </Grid>
        </section>
        {fields.length === 0 && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => fetchEventsArr(getValues())}
          >
            Proceed
          </Button>
        )}

        {isErrFetching && (
          <div className="error_msg">
            No events found for your input data. please check again!
          </div>
        )}
        {fields.length > 0 && (
          <section>
            <Fields
              {...{
                control,
                errors,
                fields: filteredFields,
              }}
            />
          </section>
        )}
        {fields.length > 0 && (
          <>
            <div className="reset">
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={() => resetForm()}
              >
                Reset
              </Button>
            </div>
            {/* <Button variant="contained" color="primary" type="submit">
              Save
            </Button> */}
          </>
        )}
      </Paper>
    </form>
  );
};

export const EventOneMeta = (props: WidgetConfigProps) =>
  EventMeta({ ...props, noOfFields: 1 });

export const EventThreeMeta = (props: WidgetConfigProps) =>
  EventMeta({ ...props, noOfFields: 3 });

export const EventFourMeta = (props: WidgetConfigProps) =>
  EventMeta({ ...props, noOfFields: 4 });
