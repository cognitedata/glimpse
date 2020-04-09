// Copyright 2020 Cognite AS
import React from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './EventConfig.css';

export default (props: any) => {
  const { control } = props;
  const { fields } = useFieldArray({
    control,
    name: `fields`,
  });

  return (
    <div>
      {fields.map((item: any, k: number) => {
        return (
          <div key={item.id} className="inner_form">
            <Controller
              className="textField"
              as={
                <Autocomplete
                  id="combo-box-demo"
                  options={props.fields}
                  groupBy={(option: any) => option.type}
                  getOptionLabel={(option: any) => option.field}
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
              onChange={(data: any) => {
                return data[1];
              }}
              control={control}
            />
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
