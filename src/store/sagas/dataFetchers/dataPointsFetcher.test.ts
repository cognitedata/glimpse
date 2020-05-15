// Copyright 2020 Cognite AS
import { testSaga } from 'redux-saga-test-plan';
import { mockDataPoints } from 'mocks/widgetsMockData/tsWideNumericMock';
import { setTsDps } from 'store/actions/root-action';
import pollUpdateTsDps from './dataPointsFetcher';

class CogniteClient {
  loginWithOAuth = jest.fn();
  authenticate = jest.fn();
  datapoints = {
    retrieve: jest.fn(),
  };
}

const client = new CogniteClient();
const tsDataPointsObj = [{ datapoints: mockDataPoints }];
beforeEach(() => {
  client.datapoints.retrieve.mockResolvedValue(mockDataPoints);
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
