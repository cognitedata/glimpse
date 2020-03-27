import React, { FC, useState } from 'react';
import { generateRandomKey } from 'utills/utills';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import { mockedWidgetConfigs, initialLayoutMocked } from 'mocks/gridMocks';
import { WIDGET_TYPE_IDS } from 'constants/widgetSettings';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'StoreTypes';
import { getEmptyPositions } from '../GridLayout/gridOperations/gridOperations';
import GridLayout from '../GridLayout/GridLayout';
import AddComponent from './AddComponent';
import { WidgetConfig } from '../interfaces';

import { setAlerts } from '../../../store/actions/root-action';

const WithAddGridComponents = (WrappedComponent: any) => {
  const WrapperObject: FC<Props> = (props: Props) => {
    const [widgetConfigs, setWidgetConfigs] = useState(mockedWidgetConfigs);
    const [layouts, setLayouts] = useState(initialLayoutMocked);

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
            field1: {
              label: 'Current Machine',
              key: 'asset.description',
            },
          };
          prevWidgetConfigs.push({
            i: key,
            widgetTypeId: WIDGET_TYPE_IDS.ASSET_INFO,
            valueMapping,
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

    return (
      <>
        <AddComponent addElement={addElement} />
        <WrappedComponent
          layouts={layouts}
          widgetConfigs={widgetConfigs}
          onRemoveItem={onRemoveItem}
          onLayoutChange={onLayoutChange}
        />
      </>
    );
  };
  return connect(null, dispatchProps)(WrapperObject);
};

const dispatchProps = {
  setAlerts,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>;

export default WithAddGridComponents(GridLayout);
