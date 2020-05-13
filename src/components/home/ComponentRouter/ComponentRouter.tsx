// Copyright 2020 Cognite AS
import React from 'react';

import GridContainer from 'components/grid/GridContainer';

import { Switch, Route, Redirect } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import Overview from './Overview';

/**
 *
 * This is the Home component where components are mapped to routing
 */
const ComponentRouter = () => (
  <Switch>
    <Route name="overview" exact path={RouterPaths.OVERVIEW}>
      <Overview />
    </Route>
    <Route
      name="settings"
      exact
      path={RouterPaths.SETTINGS}
      render={() => <GridContainer />}
    />
    <Route
      name="feedback"
      exact
      path={RouterPaths.FEEDBACK}
      render={() => <>To Be Implemented</>}
    />
    <Route
      path={RouterPaths.LOGOUT}
      render={() => <Redirect to={RouterPaths.ROOT} />}
    />
    <Route
      path={RouterPaths.ROOT}
      render={() => <Redirect to={RouterPaths.OVERVIEW} />}
    />
  </Switch>
);

export default ComponentRouter;
