// Copyright 2020 Cognite AS
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import './AssetInfoConfigurator.css';
import { RootAction, RootState } from 'StoreTypes';
import { bindActionCreators, Dispatch } from 'redux';

import { setAlerts } from 'store/actions/root-action';
import { connect } from 'react-redux';
import keysIn from 'lodash/keysIn';
import { removeObjects } from 'utils/utils';
import fill from 'lodash/fill';
import Fields from '../common/Fields/Fields';
import { FieldObj } from '../common/interfaces';
import { FormValues, DefaultProps } from './interfaces';

/**
 * Component for asset info widget configurator
 */
export const AssetInfoConfigurator = (props: TimeseriesConfiguratorProps) => {
  const [fields, setFields] = useState<FieldObj[]>([]);
  const excludeFieldsArr = ['metadata'];
  const isCustomNameRequired = true;

  const defaultValues: FormValues = {
    fields: fill(Array(1), {
      fieldObj: { field: 'name', type: 'Fields', path: 'name' },
      customName: 'Current Machine',
    }),
  };

  const { handleSubmit, reset, control, errors } = useForm({
    defaultValues,
  });

  /**
   *
   * This is fired when user submit the form.
   * Return value is updated with the form values.
   */
  const onSubmit = (data: FormValues) => {
    const returnObj = {
      valueMapping: {
        fields: [
          {
            label: data.fields[0].customName,
            key: data.fields[0].fieldObj?.field,
          },
        ],
      },
    };
    props.onCreate(returnObj);
  };

  /**
   * This method is used to extract asset object properties and set in the state
   */
  const updateAssetKeys = () => {
    const fieldsArr = removeObjects(keysIn(props.asset), excludeFieldsArr)
      .sort((a, b) => a.localeCompare(b))
      .map(field => ({
        field,
        type: 'Fields',
        path: field,
      }));

    const metaFieldsArr = keysIn(props.asset.metadata)
      .sort((a, b) => a.localeCompare(b))
      .map(field => ({
        field: `metadata.${field}`,
        type: 'Meta Fields',
        path: field,
      }));

    setFields([...fieldsArr, ...metaFieldsArr]);
  };

  useEffect(() => {
    updateAssetKeys();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form className="AssetInfoConfigurator" onSubmit={handleSubmit(onSubmit)}>
      <Paper variant="outlined" className="paperbox">
        <section>
          <Fields
            {...{
              control,
              errors,
              fields,
              isCustomNameRequired,
            }}
          />
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

const dispatchProps = {
  setAlerts,
};

const mapStateToProps = (state: RootState) => {
  return {
    asset: state.appState.asset,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type TimeseriesConfiguratorProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  DefaultProps;

export default connect(mapStateToProps, dispatchProps)(AssetInfoConfigurator);
