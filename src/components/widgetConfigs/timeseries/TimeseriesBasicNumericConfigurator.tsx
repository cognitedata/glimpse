// Copyright 2020 Cognite AS
import { connect } from 'react-redux';

import {
  TimeseriesConfigurator,
  TimeseriesConfiguratorProps,
  dispatchProps,
} from './TimeseriesConfigurator';

/**
 *
 * This is a configurator component for Timeseries basic numeric widget
 * This extends TimeseriesConfigurator base component by passing required additional fields list
 */
const TimeseriesBasicNumericConfigurator = (
  props: TimeseriesConfiguratorProps
) => {
  const configFields = ['unit'];
  return TimeseriesConfigurator({ ...props, configFields });
};

export default connect(null, dispatchProps)(TimeseriesBasicNumericConfigurator);
