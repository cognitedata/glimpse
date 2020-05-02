// Copyright 2020 Cognite AS
import React, { FC } from 'react';

import GridContainer from 'components/grid/GridContainer';

import { Redirect } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import { RootState } from 'StoreTypes';
import { connect } from 'react-redux';

/**
 *
 * This is the Overview component.
 * If there are no machines configured, this will redirect back to the settings page
 */
const Overview: FC<Props> = (props: Props) => {
  return props.assetsLength > 0 ? (
    <GridContainer />
  ) : (
    <Redirect to={RouterPaths.SETTINGS} />
  );
};

const mapStateToProps = (state: RootState) => ({
  assetsLength: state.appState.assets.length,
});

type Props = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Overview);
