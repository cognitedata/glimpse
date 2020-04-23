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
import { FieldControl, FieldObj } from '../interfaces';

type EventFieldsProps = {
  control?: Control<FieldControl>;
  errors?: NestDataObject<FieldControl, FieldError>;
  fields: FieldObj[];
  isCustomNameRequired?: boolean;
};
/**
 * This is a nested form. Which can be used to show multiple number of inline
 * property selection dropdown and customName fields with validation.
 */
export default (props: EventFieldsProps) => {
  const { control, errors, isCustomNameRequired = false } = props;
  const { fields } = useFieldArray({
    control,
    name: `fields`,
  });

  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="fields">
            <Grid container spacing={3} className="inner_form">
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
                          label={`Select Field ${
                            fields.length > 1 ? index + 1 : ''
                          }`}
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
                {errors?.fields &&
                  errors.fields[index] &&
                  errors.fields[index].fieldObj && (
                    <span className="validation_msg">
                      Field {fields.length > 1 ? index + 1 : ''} is required
                    </span>
                  )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  className="textField"
                  as={
                    <TextField
                      id="customName"
                      label="Custom Name"
                      variant="outlined"
                      placeholder="Enter Name"
                    />
                  }
                  name={`fields[${index}].customName`}
                  rules={{ required: isCustomNameRequired }}
                  control={control}
                />
                {errors?.fields &&
                  errors.fields[index] &&
                  errors.fields[index].customName && (
                    <span className="validation_msg">
                      Custom Name is required
                    </span>
                  )}
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};
