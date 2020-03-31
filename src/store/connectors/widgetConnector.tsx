// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import { connect } from 'react-redux';

/**
 * This is used to connect widgets with state
 */
export default (mapStateToProps: any, component: FC) => {
  const ConnectedComponent = connect(mapStateToProps)(component);
  return <ConnectedComponent />;
};
