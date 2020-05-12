// Copyright 2020 Cognite AS
import { testSaga } from 'redux-saga-test-plan';
import { mockWidgetConfigs } from 'mocks/widgetsMockData/widgetConfigsMockData';
import { setWidgetConfigs } from 'store/actions/app';
import get from 'lodash/get';
import { Effect } from 'redux-saga/effects';
import { WidgetConfig } from 'components/grid/interfaces';
import {
  getGridLayout,
  getEmptyPositions,
} from 'components/grid/GridLayout/gridOperations/gridOperations';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import WIDGET_SETTINGS from 'constants/widgetSettings';
import * as respository from 'components/widgetCRUD/repo/widgetConfLSRepo';
import { error } from 'console';
import { getWidgetConfigs, addWidget, saveWidgetConfigs } from './widgetConfig';

describe('Widget configs Saga', () => {
  const mockUser = Object.keys(mockWidgetConfigs)[0];
  const widgetConfForuser = get(mockWidgetConfigs, mockUser);
  const mockAssetId = Object.keys(widgetConfForuser)[0];
  const mockWidgetConfigArr: any = get(widgetConfForuser, mockAssetId);
  const mockId = 'abcd';
  const mockLastUpdated = new Date();

  test('Should get correct configuration for user and selected asset Id', async () => {
    const testGen = testSaga(getWidgetConfigs);
    return testGen
      .next()
      .next(mockUser)
      .next(mockAssetId)
      .next(widgetConfForuser)
      .put(
        setWidgetConfigs({
          id: mockAssetId,
          lastUpdated: null,
          widgetConfigs: mockWidgetConfigArr,
        })
      )
      .next()
      .isDone();
  });

  test('Should get empty array if no configurations for sleted assetID', async () => {
    const testGen = testSaga(getWidgetConfigs);
    return testGen
      .next()
      .next(mockUser)
      .next('1')
      .next(widgetConfForuser)
      .put(
        setWidgetConfigs({
          id: '1',
          lastUpdated: null,
          widgetConfigs: [],
        })
      )
      .next()
      .isDone();
  });

  test('Should update widget config list when adding a new widget', async () => {
    jest.mock('./widgetConfig', () => ({
      widgetConfWrapper: { widgetConfigs: mockWidgetConfigArr },
    }));
    const layouts = mockWidgetConfigArr.map((wconf: WidgetConfig) =>
      getGridLayout(wconf)
    );
    const { widgetTypeId } = mockWidgetConfigArr[0];
    const [w, h] = WIDGET_SETTINGS[widgetTypeId].size;
    const widgetCordinates = getEmptyPositions(layouts, w, h, MAXCOLS, MAXROWS);
    const newwidget = {
      ...mockWidgetConfigArr[0],
      i: mockId,
      cordinates: widgetCordinates,
    };
    const testGen = testSaga(
      addWidget,
      {
        payload: mockWidgetConfigArr[0],
      } as Effect,
      mockId,
      mockLastUpdated
    );
    return testGen
      .next()
      .next({
        id: '1',
        lastUpdated: mockLastUpdated,
        widgetConfigs: mockWidgetConfigArr,
      })
      .put(
        setWidgetConfigs({
          id: '1',
          lastUpdated: mockLastUpdated,
          widgetConfigs: mockWidgetConfigArr.concat(newwidget),
        })
      )
      .next()
      .isDone();
  });

  test('Should update configurations correctly', async () => {
    const updateMock = jest.fn();
    // @ts-ignore
    respository.update = updateMock;
    // @ts-ignore
    const testGen = testSaga(saveWidgetConfigs);
    testGen
      .next()
      .next(mockUser)
      .next({
        id: '1',
        lastUpdated: new Date(),
        widgetConfigs: mockWidgetConfigArr,
      })
      .next()
      .isDone();
    expect(updateMock).toBeCalledTimes(1);
  });

  test('Should handle the error if the update failed', async () => {
    // @ts-ignore
    const testGen = testSaga(saveWidgetConfigs);
    testGen
      .next()
      .next(mockUser)
      .next({
        id: '1',
        lastUpdated: new Date(),
        widgetConfigs: mockWidgetConfigArr,
      })
      .throw(error)
      .next()
      .isDone();
  });
});
