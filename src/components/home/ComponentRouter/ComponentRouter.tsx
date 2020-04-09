// Copyright 2020 Cognite AS
import React from 'react';

import GridAddons from 'components/grid/AddComponents/GridAddons';

import { Switch, Route, Redirect } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import EventConfig from 'components/widgetConfigs/EventConfig';

/**
 *
 * This is the Home component where components are mapped to routing
 */
const ComponentRouter = () => (
  <Switch>
    <Route name="overview" exact path={RouterPaths.OVERVIEW}>
      <GridAddons />
    </Route>
    <Route
      name="settings"
      exact
      path={RouterPaths.SETTINGS}
      render={() => <GridAddons />}
    />
    <Route
      name="feedback"
      exact
      path={RouterPaths.FEEDBACK}
      render={() => <EventConfig />}
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
