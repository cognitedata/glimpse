// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import { RootState } from 'StoreTypes';

/**
 * This is used to connect widgets with state
 */
export default (
  mapStateToProps: MapStateToPropsParam<{}, {}, RootState>,
  component: FC
) => {
  const ConnectedComponent = connect(mapStateToProps)(component);
  return <ConnectedComponent />;
};
