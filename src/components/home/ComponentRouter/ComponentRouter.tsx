// Copyright 2020 Cognite AS
import React from 'react';

import WithAddGridComponents from 'components/grid/AddComponents/WithAddGridComponents';

import { Switch, Route, Redirect } from 'react-router-dom';

/**
 *
 * This is the Home component where components are mapped to routing
 */
const ComponentRouter = () => (
  <Switch>
    <Route name="overview" exact path="/overview">
      <WithAddGridComponents />
    </Route>
    <Route
      name="settings"
      exact
      path="/settings"
      render={() => <h2>Settings screen is in progress</h2>}
    />
    <Route
      name="feedback"
      exact
      path="/feedback"
      render={() => <h2>Feedback screen is in progress</h2>}
    />
    <Route path="/logout" render={() => <Redirect to="/" />} />
    <Route path="/" render={() => <Redirect to="/overview" />} />
  </Switch>
);

export default ComponentRouter;
