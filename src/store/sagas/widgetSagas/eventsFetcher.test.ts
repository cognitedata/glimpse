import { testSaga } from 'redux-saga-test-plan';

import { setEvent } from '../../actions/root-action';

import { MockCogniteClient } from '../../../mocks';
import { eventList } from '../../../mocks/eventList';

import pollUpdateEventInfo from './eventsFetcher';

class CogniteClient extends MockCogniteClient {
  loginWithOAuth: any = jest.fn();
  authenticate = jest.fn();
  events: any = {
    list: jest.fn(),
  };
}

const client = new CogniteClient({ appId: 'mock app' });

beforeEach(() => {
  client.events.list.mockReturnValue(eventList);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Events fetcher Saga', () => {
  test('should fetch events and set to state', async () => {
    const testGen = testSaga(pollUpdateEventInfo, {
      payload: { actionKey: 'testKey', queryParams: { ongoing: false } },
    });
    return testGen
      .next()
      .next(client)
      .next()
      .next(eventList)
      .put(setEvent({ testKey: eventList.items[0] }))
      .next()
      .next({ cancel: true })
      .isDone();
  });
});
