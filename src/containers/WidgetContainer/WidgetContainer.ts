// Copyright 2020 Cognite AS
import { useEffect } from 'react';
import { WidgetConfig } from 'components/grid/interfaces';
import { useLocation } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import generateWidget from './widgetGenerator/generateWidget';
import {
  dispatchDistinctActions,
  endPolling,
} from './actionDispatcher/actionDispatcher';

type Props = {
  widgetConfigs: WidgetConfig[];
  onRemoveItem: Function;
};

/**
 * Generate Widget based on the stored settings, Dispatch distinct actions to fetch data.
 */
export default (props: Props) => {
  const { widgetConfigs, onRemoveItem } = props;
  const isOnSettingPage = useLocation().pathname === RouterPaths.SETTINGS;
  useEffect(() => {
    dispatchDistinctActions(props.widgetConfigs);
    return endPolling;
  }, [props.widgetConfigs]);
  return widgetConfigs.map(widgetConfig =>
    generateWidget(widgetConfig, onRemoveItem, isOnSettingPage)
  );
};
