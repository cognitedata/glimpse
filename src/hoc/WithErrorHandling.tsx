// Copyright 2020 Cognite AS
import React, { FC } from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { RootState, RootAction } from 'StoreTypes';
import Alerts, { SnackBarProps } from '../components/UI/Alerts/Alerts';
import BaseLogo from '../components/UI/BaseLogo/BaseLogo';

import { clearAlerts } from '../store/actions/root-action';

/**
 * This higher order component is used to populate global alerts. When ever a alert is pushed to redux,
 * this will populate appropiate alert
 * @prop hideApp
 *            This will hide the current background and show the logo instead
 */

const withErrorHandling = (WrappedComponet: React.ComponentType) => {
  const WithErrorHandlingComponent: FC<Props> = (props: Props) => {
    let returnAlert = null;

    if (props.alerts) {
      const defaultHandleClose = () => {
        props.clearAlerts();
      };
      const alertProps: SnackBarProps = {
        duration: props.alerts.duration,
        handleClose:
          typeof props.alerts.handleClose === 'undefined'
            ? defaultHandleClose
            : props.alerts.handleClose,
        type: props.alerts.type,
        text: props.alerts.text,
      };
      returnAlert = <Alerts {...alertProps} />;
    }

    return (
      <div>
        {props.alerts && props.alerts.hideApp ? (
          <BaseLogo />
        ) : (
          <WrappedComponet />
        )}
        {returnAlert}
      </div>
    );
  };
  return connect(mapStateToProps, dispatchProps)(WithErrorHandlingComponent);
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.appState.alerts,
});

const dispatchProps = {
  clearAlerts,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default withErrorHandling;
