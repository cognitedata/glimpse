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
import './Configurator.css';
import Grid from '@material-ui/core/Grid';
import { EventConfigData, FieldObj } from './interfaces';

type EventFieldsProps = {
  control?: Control<EventConfigData>;
  errors?: NestDataObject<EventConfigData, FieldError>;
  fields: FieldObj[];
};
export default (props: EventFieldsProps) => {
  const { control, errors } = props;
  const { fields } = useFieldArray({
    control,
    name: `fields`,
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} className="inner_form event_config">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Controller
                  className="textField"
                  as={
                    <Autocomplete
                      id={`fields[${k}].fieldObj`}
                      options={props.fields}
                      groupBy={option => option.type}
                      getOptionLabel={option => option.field}
                      getOptionSelected={() => true}
                      renderInput={params => (
                        <TextField
                          variant="outlined"
                          {...params}
                          label={`Select Field ${k + 1}`}
                          placeholder="Search Field"
                        />
                      )}
                    />
                  }
                  name={`fields[${k}].fieldObj`}
                  onChange={data => {
                    return data[1];
                  }}
                  rules={{ required: true }}
                  control={control}
                />
                {errors?.fields && errors.fields[k] && (
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
                  name={`fields[${k}].customName`}
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
