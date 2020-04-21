// Copyright 2020 Cognite AS
import React, { FC, useState, useEffect, useRef } from 'react';
import { generateRandomKey } from 'utils/utils';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import WIDGET_SETTINGS, { WIDGET_TYPE_IDS } from 'constants/widgetSettings';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'StoreTypes';
import {
  getWidgetConfigByUserId,
  saveWidgetConfig,
} from 'components/widgetCRUD/widgetCruds';
import get from 'lodash/get';
import {
  getEmptyPositions,
  getGridLayout,
} from './GridLayout/gridOperations/gridOperations';
import GridLayout from './GridLayout/GridLayout';
import AddComponent from './AddComponents/AddComponent';
import { WidgetConfig } from './interfaces';
import { setAlerts } from '../../store/actions/root-action';
/**
 * Used to Add widgets to the GridLayOut with extra Features as remove.
 * @param props GridContainerProps
 */

const GridContainer: FC<GridContainerProps> = (props: GridContainerProps) => {
  const isMounted = useRef(true);
  const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig[]>([]);
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const addElement = (height: number, width: number) => {
    if (height > 0 && height <= 6 && width > 0 && width <= 4) {
      const cordinates = getEmptyPositions(
        layouts,
        width,
        height,
        MAXCOLS,
        MAXROWS
      );
      if (!cordinates) {
        props.setAlerts({
          type: 'error',
          text: 'There is no position for adding the component',
          duration: 50000,
          hideApp: false,
        });
        return;
      }
      const key = generateRandomKey();
      setWidgetConfigs((prevWidgetConfigs: WidgetConfig[]) => {
        const valueMapping = {
          fields: [
            {
              label: 'Current Machine',
              key: 'asset.description',
            },
          ],
        };
        prevWidgetConfigs.push({
          i: key,
          widgetTypeId: WIDGET_TYPE_IDS.ASSET_INFO,
          valueMapping,
          cordinates: [cordinates[0], cordinates[1]],
        });
        return prevWidgetConfigs;
      });
      setLayouts((prevLayout: Layout[]) => {
        const newLayout = [...prevLayout];
        newLayout.push({
          i: key,
          x: cordinates[0],
          y: cordinates[1],
          w: width,
          h: height,
        });
        return newLayout;
      });
      return;
    }
    props.setAlerts({
      type: 'error',
      text: '1 <= width <=4 and 1 <= height <= 6',
      hideApp: false,
    });
  };

  const onRemoveItem = (key: string) => {
    setLayouts((prevLayout: Layout[]) =>
      prevLayout.filter((compDetails: Layout) => compDetails.i !== key)
    );
    setWidgetConfigs((prevWidgetConfigs: WidgetConfig[]) =>
      prevWidgetConfigs.filter(
        (compDetails: WidgetConfig) => compDetails.i !== key
      )
    );
  };

  const onLayoutChange = (newLayout: Layout[]) => {
    console.log(newLayout);
  };
  useEffect(() => {
    if (props.newWidget !== undefined) {
      addWidget(props.newWidget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newWidget]);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    initilizeGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.assetId]);

  const initilizeGrid = async () => {
    let widgetConf = {};
    try {
      widgetConf = await getWidgetConfigByUserId(props.user);
      // eslint-disable-next-line no-empty
    } catch (error) {}
    if (isMounted.current) {
      const widgetConfForAsset = get(widgetConf, props.assetId) || [];
      setWidgetConfigs(widgetConfForAsset);
      setLayouts(widgetConfForAsset.map(widConf => getGridLayout(widConf)));
    }
  };

  const addWidget = async (widgetConfig: WidgetConfig) => {
    const { widgetTypeId } = widgetConfig;
    const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
    const widgetCordinates = getEmptyPositions(layouts, w, h, MAXCOLS, MAXROWS);
    if (!widgetCordinates) {
      props.setAlerts({
        type: 'error',
        text: 'There is no position for adding the component',
        duration: 50000,
        hideApp: false,
      });
      return;
    }
    const newWidgetConf = { ...widgetConfig };
    newWidgetConf.i = generateRandomKey();
    newWidgetConf.cordinates = widgetCordinates;
    const newWidgetConfs = widgetConfigs.concat(newWidgetConf);
    setWidgetConfigs(newWidgetConfs);
    setLayouts(newWidgetConfs.map(widConf => getGridLayout(widConf)));
    const isSaveSucess = await saveWidgetConfig(
      props.user,
      props.assetId,
      newWidgetConf
    );
    if (!isSaveSucess) {
      props.setAlerts({
        type: 'error',
        text: 'Widget save failed',
        duration: 50000,
        hideApp: false,
      });
    }
  };

  return (
    <>
      <AddComponent addElement={addElement} />
      <div style={{ height: '85vh', padding: '10px' }}>
        <GridLayout
          layouts={layouts}
          widgetConfigs={widgetConfigs}
          onRemoveItem={onRemoveItem}
          onLayoutChange={onLayoutChange}
        />
      </div>
    </>
  );
};

const dispatchProps = {
  setAlerts,
};
const mapStateToProps = (state: RootState) => ({
  assetId: state.widgetState.asset?.id,
  user: state.authState.userInfo?.name,
  newWidget: state.widgetState.newWidget,
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type GridContainerProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, dispatchProps)(GridContainer);
