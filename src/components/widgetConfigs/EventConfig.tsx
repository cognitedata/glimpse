// Copyright 2020 Cognite AS
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import keysIn from 'lodash/keysIn';
import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel } from '@material-ui/core';
import { fetchEvents } from './eventFetcher';
import FieldArray from './fields';
import './EventConfig.css';

export default () => {
  const [fields, setFields] = useState([]);
  const [isErrFetching, setIsErrFetching] = useState(false);
  const defaultValues = {
    ongoing: false,
    type: '***',
    subtype: 'VAL',
    fields: [
      { fieldObj: null, customName: 'test' },
      { fieldObj: null, customName: '' },
      { fieldObj: null, customName: '' },
    ],
  };

  const {
    register,
    handleSubmit,
    errors,
    control,
    formState,
    getValues,
    setValue,
  } = useForm({
    defaultValues,
  });
  const onSubmit = async (data: any) => {
    // eslint-disable-next-line no-alert
    // setValue('switch', true);
    console.dir(data);
    // const fetchedData = await fetchEvents(data);
    // console.dir(fetchedData);
  };

  const getresults = async (data: any) => {
    // eslint-disable-next-line no-alert
    // setValue('switch', true);
    console.dir(data);
    const fetchedData = await fetchEvents(data);
    if (fetchedData.length > 0) {
      setIsErrFetching(false);
      console.dir(fetchedData[0]);
      setValue('search', generateValuesObj(fetchedData[0]));
    } else {
      setIsErrFetching(true);
    }
  };
  function excludeFields(originalArr: string[], excludeArr: string[]) {
    return filter(originalArr, key => {
      return indexOf(excludeArr, key) === -1;
    });
  }
  function generateValuesObj(event: any) {
    const fieldsArray: any = [];
    const excludeFieldsArr = ['metadata', 'assetIds', 'type', 'subtype'];
    const fieldsArr = excludeFields(
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
    console.log(fieldsArray);
    setFields(fieldsArray);
  }

  console.log(errors);
  console.log(formState);

  return (
    <form className="event_config" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        className="textField"
        as={<TextField label="Type" placeholder="Event Type" />}
        name="type"
        control={control}
      />
      <Controller
        className="textField"
        as={<TextField label="Sub Type" placeholder="Event Subtype" />}
        name="subtype"
        control={control}
      />
      <section>
        <Controller
          className="switch"
          as={
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Is Ongoing"
              labelPlacement="start"
            />
          }
          name="ongoing"
          control={control}
        />
      </section>

      <Button
        className="proceed"
        variant="contained"
        onClick={() => getresults(getValues())}
      >
        Proceed
      </Button>

      {isErrFetching && (
        <div className="error_msg">
          No events found for your input data. please check again!
        </div>
      )}
      {fields.length > 0 && (
        <section>
          <FieldArray
            {...{
              control,
              register,
              defaultValues,
              getValues,
              fields,
            }}
          />
        </section>
      )}
      <div style={{ color: 'red' }}>
        {Object.keys(errors).length > 0 &&
          'There are errors, check your console.'}
      </div>
      {fields.length > 0 && (
        <>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </>
      )}
    </form>
  );
};
