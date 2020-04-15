// Copyright 2020 Cognite AS
import React, { useState } from 'react';
import { useForm, Controller, OnSubmit } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import keysIn from 'lodash/keysIn';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel } from '@material-ui/core';
import { CogniteEvent } from '@cognite/sdk';
import { removeObjects } from 'utils/utils';
import fill from 'lodash/fill';
import { fetchEvents } from './eventFetcher';
import Fields from './Fields';
import './EventConfig.css';
import { FieldObj, EventConfigData, FetchEvent } from './interfaces';

/**
 * Events widgets configuration
 */
export default () => {
  const excludeFieldsArr = ['metadata', 'assetIds', 'type', 'subtype'];
  const [fields, setFields] = useState<FieldObj[]>([]);
  const [isErrFetching, setIsErrFetching] = useState(false);
  const NO_OF_FIELDS = 3;
  const defaultValues: EventConfigData = {
    ongoing: false,
    type: '***',
    subtype: 'VAL',
    fields: fill(Array(NO_OF_FIELDS), { fieldObj: null, customName: '' }),
  };

  const { handleSubmit, reset, errors, watch, control, getValues } = useForm({
    defaultValues,
  });
  const onSubmit: OnSubmit<EventConfigData> = data => {
    console.dir(data);
    console.dir(errors);
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
    <form className="event_config" onSubmit={handleSubmit(onSubmit)}>
      <section className={fields.length > 0 ? 'event_details_disabled' : ''}>
        <Controller
          className="textField"
          as={
            <TextField
              label="Type"
              disabled={fields.length > 0}
              placeholder="Event Type"
            />
          }
          name="type"
          control={control}
        />
        <Controller
          className="textField"
          as={
            <TextField
              label="Subtype"
              disabled={fields.length > 0}
              placeholder="Event Subtype"
            />
          }
          name="subtype"
          control={control}
        />
        <Controller
          className="switch"
          as={
            <FormControlLabel
              control={<Switch color="primary" disabled={fields.length > 0} />}
              label="Is Ongoing"
              labelPlacement="start"
            />
          }
          name="ongoing"
          control={control}
        />
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
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </>
      )}
    </form>
  );
};
