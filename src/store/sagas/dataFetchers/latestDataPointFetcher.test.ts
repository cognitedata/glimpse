// Copyright 2020 Cognite AS
import { testSaga } from 'redux-saga-test-plan';

import { setLatestDataPoint } from '../../actions/root-action';

import { latestDatapoint } from '../../../mocks/latestDataPoint';

import pollUpdateDataLatestPoint from './latestDataPointFetcher';

class CogniteClient {
  loginWithOAuth = jest.fn();
  authenticate = jest.fn();
  datapoints = {
    retrieveLatest: jest.fn(),
  };
}

const client = new CogniteClient();

const dataPointObject = {
  value: latestDatapoint[0].datapoints[0].value,
  timestamp: latestDatapoint[0].datapoints[0].timestamp,
};

beforeEach(() => {
  client.datapoints.retrieveLatest.mockResolvedValue(latestDatapoint);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Latest data point fetcher Saga', () => {
  test('should latest data point and set to state', async () => {
    const testGen = testSaga(pollUpdateDataLatestPoint, {
      payload: { actionKey: 'testKey', ongoing: false },
    });
    return testGen
      .next()
      .next(client)
      .next(latestDatapoint)
      .put(setLatestDataPoint({ testKey: dataPointObject }))
      .next()
      .next({ cancel: true })
      .isDone();
  });
});
