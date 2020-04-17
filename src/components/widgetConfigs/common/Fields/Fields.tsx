// Copyright 2020 Cognite AS
import React from 'react';
import {
  useFieldArray,
  Controller,
  Control,
  NestDataObject,
  FieldError,
} from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './Fields.css';
import Grid from '@material-ui/core/Grid';
import { EventConfigData, FieldObj } from '../../event/interfaces';

type EventFieldsProps = {
  control?: Control<EventConfigData>;
  errors?: NestDataObject<EventConfigData, FieldError>;
  fields: FieldObj[];
};
/**
 * Nested Form, Generate based on the number of fields.
 */
export default (props: EventFieldsProps) => {
  const { control, errors } = props;
  const { fields } = useFieldArray({
    control,
    name: `fields`,
  });

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="fields">
            <Grid container spacing={3} className="inner_form event_config">
              <Grid item xs={6}>
                <Controller
                  className="textField"
                  as={
                    <Autocomplete
                      id={`fields[${index}].fieldObj`}
                      options={props.fields}
                      groupBy={option => option.type}
                      getOptionLabel={option => option.field}
                      getOptionSelected={() => true}
                      renderInput={params => (
                        <TextField
                          variant="outlined"
                          {...params}
                          label={`Select Field ${index + 1}`}
                          placeholder="Search Field"
                        />
                      )}
                    />
                  }
                  name={`fields[${index}].fieldObj`}
                  onChange={data => {
                    return data[1];
                  }}
                  rules={{ required: true }}
                  control={control}
                />
                {errors?.fields && errors.fields[index] && (
                  <span className="validation_msg">Your input is required</span>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  className="textField"
                  as={
                    <TextField
                      label="Custom Name"
                      variant="outlined"
                      placeholder="Enter Name"
                    />
                  }
                  name={`fields[${index}].customName`}
                  control={control}
                />
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};
