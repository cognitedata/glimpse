// Copyright 2020 Cognite AS
import { connect } from 'react-redux';

import {
  TimeseriesConfigurator,
  TimeseriesConfiguratorProps,
  dispatchProps,
} from './TimeseriesConfigurator';

/**
 *
 * This is a configurator component for Timeseries basic string widget.
 * This extends TimeseriesConfigurator base component by passing required additional fields list
 */
const TimeseriesBasicStringConfigurator = (
  props: TimeseriesConfiguratorProps
) => {
  const configFields = ['elapsedTimeEnabler'];
  return TimeseriesConfigurator({ ...props, configFields });
};

export default connect(null, dispatchProps)(TimeseriesBasicStringConfigurator);
