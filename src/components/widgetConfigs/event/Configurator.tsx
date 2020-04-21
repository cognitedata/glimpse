// Copyright 2020 Cognite AS
import React, { useState } from 'react';
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
import Fields from '../common/Fields/Fields';
import './Configurator.css';
import '../common/matUIConfig.css';
import {
  EventConfigData as EventQueryData,
  FetchEvent,
  EventConfReturn,
  EventWidgetConfigProps,
  WidgetConfigProps,
} from './interfaces';
import { FieldObj } from '../common/interfaces';

/**
 * use to configure the event widget with selected multipe data/meta-data filelds
 */
const Configurator = (props: EventWidgetConfigProps) => {
  const { onCreate, noOfFields } = props;
  const excludeFieldsArr = ['metadata', 'assetIds', 'type', 'subtype'];
  const [fields, setFields] = useState<FieldObj[]>([]);
  const [isErrFetching, setIsErrFetching] = useState(false);

  const defaultValues: EventQueryData = {
    ongoing: false,
    type: '***',
    subtype: 'VAL',
    fields: fill(Array(noOfFields), { fieldObj: null, customName: '' }),
  };

  const fetchEventsArr = async (data: FetchEvent) => {
    const fetchedData = await fetchEvents(data);
    if (fetchedData.length > 0) {
      setIsErrFetching(false);
      setFields(generateFieldObjs(fetchedData[0]));
    } else {
      setIsErrFetching(true);
    }
  };

  /**
   * generate fieldObject array based on the keys on an event
   * @param event
   */
  const generateFieldObjs = (event: CogniteEvent): FieldObj[] => {
    const fieldsArr = removeObjects(keysIn(event), excludeFieldsArr)
      .sort((a, b) => a.localeCompare(b))
      .map(field => ({
        field,
        type: 'Fields',
        path: field,
      }));

    const metaFieldsArr = keysIn(event.metadata)
      .sort((a, b) => a.localeCompare(b))
      .map(field => ({
        field,
        type: 'Meta Fields',
        path: field,
      }));
    return [...fieldsArr, ...metaFieldsArr];
  };

  const { handleSubmit, reset, errors, control, getValues } = useForm({
    defaultValues,
  });

  const onSubmit: OnSubmit<EventQueryData> = data => {
    const { type, subtype, ongoing } = data;
    const returnObj = {} as EventConfReturn;
    returnObj.queryParams = { type, subtype, ongoing };
    returnObj.valueMapping = {
      fields: data.fields.map(field => ({
        key: field.fieldObj?.path,
        label:
          field.customName === '' ? field.fieldObj!.field : field.customName,
      })),
    };
    onCreate(returnObj);
  };

  const resetForm = () => {
    setFields([]);
    reset();
  };

  return (
    <form
      className="event_config mat_ui_config"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Paper variant="outlined" className="paperbox">
        <section
          data-testid="section1"
          className={fields.length > 0 ? 'event_details_disabled' : ''}
        >
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
            data-testid="proceed-button"
            color="primary"
            variant="contained"
            onClick={() => fetchEventsArr(getValues())}
          >
            Proceed
          </Button>
        )}

        {isErrFetching && (
          <div className="error_msg" data-testid="error-msg">
            No events found for your input data. please check again!
          </div>
        )}
        {fields.length > 0 && (
          <div data-testid="section2">
            <section>
              <Fields
                {...{
                  control,
                  errors,
                  fields,
                }}
              />
            </section>
            <section>
              <div className="reset">
                <Button
                  data-testid="reset-button"
                  color="primary"
                  variant="contained"
                  type="button"
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
              </div>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </section>
          </div>
        )}
      </Paper>
    </form>
  );
};

export const EventOneMetaConfigurator = (props: WidgetConfigProps) =>
  Configurator({ ...props, noOfFields: 1 });

export const EventThreeMetaConfigurator = (props: WidgetConfigProps) =>
  Configurator({ ...props, noOfFields: 3 });

export const EventFourMetaConfigurator = (props: WidgetConfigProps) =>
  Configurator({ ...props, noOfFields: 4 });
