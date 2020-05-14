// Copyright 2020 Cognite AS
import { testSaga } from 'redux-saga-test-plan';
import { mockWidgetConfigs } from 'mocks/widgetsMockData/widgetConfigsMockData';
import { setWidgetConfigs } from 'store/actions/app';
import get from 'lodash/get';
import * as respository from 'services/widgetCRUD/repo/';
import { error } from 'console';
import { loadWidgetConfigs, saveWidgetConfigs } from './widgetConfig';

describe('Widget configs Saga', () => {
  const mockUser = Object.keys(mockWidgetConfigs)[0];
  const widgetConfForuser = get(mockWidgetConfigs, mockUser);
  const mockAssetId = Object.keys(widgetConfForuser)[0];
  const mockWidgetConfigArr: any = get(widgetConfForuser, mockAssetId);
  const mockWidgetConfWrapper = {
    id: mockAssetId,
    lastUpdated: null,
    widgetConfigs: mockWidgetConfigArr,
  };

  test('Should get correct configuration for user and selected asset Id', async () => {
    // @ts-ignore
    const testGen = testSaga(loadWidgetConfigs, {
      payload: { id: mockAssetId },
    });
    return testGen
      .next()
      .next(mockUser)
      .next(widgetConfForuser)
      .put(
        setWidgetConfigs({
          id: mockAssetId,
          widgetConfigs: mockWidgetConfigArr,
        })
      )
      .next()
      .isDone();
  });

  test('Should get empty array if no configurations for sleted assetID', async () => {
    // @ts-ignore
    const testGen = testSaga(loadWidgetConfigs, {
      payload: { id: '1' },
    });
    return testGen
      .next()
      .next(mockUser)
      .next(widgetConfForuser)
      .put(
        setWidgetConfigs({
          id: '1',
          widgetConfigs: [],
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
    const testGen = testSaga(saveWidgetConfigs, {
      payload: mockWidgetConfWrapper,
    });
    testGen
      .next()
      .next(mockUser)
      .next()
      .next()
      .isDone();
    expect(updateMock).toBeCalledTimes(1);
  });

  test('Should handle the error if the update failed', async () => {
    // @ts-ignore
    const testGen = testSaga(saveWidgetConfigs, {
      payload: mockWidgetConfWrapper,
    });
    testGen
      .next()
      .next()
      .throw(error)
      .next()
      .isDone();
  });
});
