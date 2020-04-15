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
import './EventConfig.css';
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
          <div key={item.id} className="inner_form">
            <div className="textField">
              <Controller
                as={
                  <Autocomplete
                    id={`fields[${k}].fieldObj`}
                    options={props.fields}
                    groupBy={option => option.type}
                    getOptionLabel={option => option.field}
                    getOptionSelected={() => true}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Field"
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
            </div>
            <Controller
              className="textField"
              as={<TextField label="Custom Name" placeholder="Enter Name" />}
              name={`fields[${k}].customName`}
              control={control}
            />
          </div>
        );
      })}
    </div>
  );
};
