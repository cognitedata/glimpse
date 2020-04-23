// Copyright 2020 Cognite AS
import { testSaga } from 'redux-saga-test-plan';
import { mockDataPoints } from 'mocks/widgetsMockData/tsWideNumericMock';
import { setTsDps } from 'store/actions/root-action';
import { MockCogniteClient } from '../../../mocks';
import pollUpdateTsDps from './dataPointsFetcher';

class CogniteClient extends MockCogniteClient {
  loginWithOAuth: any = jest.fn();
  authenticate = jest.fn();
  datapoints: any = {
    retrieve: jest.fn(),
  };
}

const client = new CogniteClient({ appId: 'mock app' });
const tsDataPointsObj = [{ datapoints: mockDataPoints }];
beforeEach(() => {
  client.datapoints.retrieve.mockReturnValue(mockDataPoints);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('data point fetcher Saga', () => {
  test('should retriew data points and set to state', async () => {
    const testGen = testSaga(pollUpdateTsDps, {
      payload: { actionKey: 'testKey', ongoing: false },
    });
    return testGen
      .next()
      .next(client)
      .next(tsDataPointsObj)
      .put(setTsDps({ testKey: tsDataPointsObj[0].datapoints }))
      .next()
      .next({ cancel: true })
      .isDone();
  });
});
