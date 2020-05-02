// Copyright 2020 Cognite AS
import { put, call } from 'redux-saga/effects';
import { AlertsPropsType } from 'components/UI/Alerts/interfaces';
import {
  setLoading,
  setLoaded,
  setAlerts,
  setLoggedOut,
  setLoggedIn,
} from '../actions/root-action';

import { MockCogniteClient } from '../../mocks';
import { groupList } from '../../mocks/groupList';

import { MESSAGES } from '../../constants/messages';

import { login, logout } from './auth';

const loginStatus = jest.fn();

const userStatus = {
  user: 'test user',
  loggedIn: true,
  project: 'test project',
  projectId: 204967111817541,
};

loginStatus
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(userStatus)
  .mockReturnValueOnce(userStatus);

class CogniteClient extends MockCogniteClient {
  loginWithOAuth: any = jest.fn();
  authenticate = jest.fn();
  login: any = {
    status: loginStatus,
  };
  logout: any = {
    getUrl: jest.fn(),
  };
  groups: any = {
    list: jest.fn(),
  };
}

const client = new CogniteClient({ appId: 'mock app' });

beforeEach(() => {
  client.groups.list.mockReturnValue(groupList);
});

afterEach(() => {
  jest.clearAllMocks();
});

const alert: AlertsPropsType = {
  type: 'error',
  text: MESSAGES.NO_ACCESS_MSG,
  hideApp: true,
};

describe('Auth Sagas', () => {
  test('should log in successfully', () => {
    const gen = login();
    expect(gen.next().value).toEqual(put(setLoading()));
    expect(gen.next().value).toEqual(put(setLoggedOut()));
    gen.next();
    expect(gen.next(client).value).toEqual(false);
    gen.next();
    gen.next(false);
    expect(gen.next(true).value).toEqual(userStatus);
    expect(gen.next(true).value).toEqual(groupList);
    gen.next(groupList);
    gen.next();
    expect(gen.next().value).toEqual(put(setLoggedIn()));
    expect(gen.next().done).toBeTruthy();
  });

  test('should set alert on error', () => {
    const gen = login();
    expect(gen.next().value).toEqual(put(setLoading()));
    expect(gen.next().value).toEqual(put(setLoggedOut()));
    gen.next();
    expect(gen.next(client).value).toEqual(userStatus);
    gen.next(true);
    expect(gen.next(client).value).toEqual(groupList);
    expect(gen.next([]).value).toEqual(put(setAlerts(alert)));
    expect(gen.next().value).toEqual(put(setLoaded()));
    expect(gen.next().done).toBeTruthy();
  });

  test('should log out successfully', () => {
    const gen = logout();
    expect(gen.next().value).toEqual(put(setLoading()));
    gen.next();
    gen.next(client);
    expect(gen.next(true).value).toEqual(put(setLoggedOut()));
    gen.next();
    expect(gen.next().value).toEqual(call(login));
    expect(gen.next().done).toBeTruthy();
  });
});
