// Copyright 2020 Cognite AS
import { connect } from 'react-redux';

import {
  TimeseriesConfigurator,
  TimeseriesConfiguratorProps,
  dispatchProps,
} from './TimeseriesConfigurator';

/**
 *
 * This is a configurator component for Timeseries tall numeric widget.
 * This extends TimeseriesConfigurator base component by passing required additional fields list
 */
const TimeseriesTallNumericConfigurator = (
  props: TimeseriesConfiguratorProps
) => {
  const configFields = ['start', 'granularity', 'unit'];
  return TimeseriesConfigurator({ ...props, configFields });
};

export default connect(null, dispatchProps)(TimeseriesTallNumericConfigurator);
