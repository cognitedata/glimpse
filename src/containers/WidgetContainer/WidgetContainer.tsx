// Copyright 2020 Cognite AS
import { useEffect, useMemo } from 'react';
import { WidgetConfig } from 'components/grid/interfaces';
import { useLocation } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import generateWidget from './widgetgenerator/generateWidget';
import dispatchDistinctActions from './actionDispatcher/actionDispatcher';

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
  const dispatchActions = useMemo(
    () => dispatchDistinctActions(props.widgetConfigs),
    [props.widgetConfigs]
  );
  useEffect(() => dispatchActions(), []); // eslint-disable-line react-hooks/exhaustive-deps
  return widgetConfigs.map(widgetConfig =>
    generateWidget(widgetConfig, onRemoveItem, isOnSettingPage)
  );
};
