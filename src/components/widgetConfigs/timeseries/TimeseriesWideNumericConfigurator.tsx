// Copyright 2020 Cognite AS
import { connect } from 'react-redux';

import {
  TimeseriesConfigurator,
  TimeseriesConfiguratorProps,
  dispatchProps,
} from './TimeseriesConfigurator';

/**
 *
 * This is a configurator component for Timeseries wide numeric widget.
 * This extends TimeseriesConfigurator base component by passing required additional fields list
 */
const TimeseriesWideNumericConfigurator = (
  props: TimeseriesConfiguratorProps
) => {
  const configFields = ['start', 'granularity', 'nameWithRange'];
  return TimeseriesConfigurator({ ...props, configFields });
};

export default connect(null, dispatchProps)(TimeseriesWideNumericConfigurator);
