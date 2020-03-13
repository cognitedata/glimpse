import '@testing-library/jest-dom';
import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockCogniteClient, groupList } from '../../mocks';

import withSecurity from '../withSecurity';

const loginStatus = jest.fn();

loginStatus.mockReturnValueOnce(false).mockReturnValueOnce(true);

class CogniteClient extends MockCogniteClient {
  loginWithOAuth: any = jest.fn();
  authenticate = jest.fn();
  login: any = {
    status: loginStatus,
  };
  groups: any = {
    list: jest.fn(),
  };
}

configure({ adapter: new Adapter() });

const client = new CogniteClient({ appId: 'mock app' });

beforeEach(() => {
  client.groups.list.mockReturnValue(groupList);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('authorization status checked successfully ', async () => {
  const Home = () => <div>Home Component</div>;

  const WrappedComponent = withSecurity({ sdk: client })(Home);

  const wrapper = mount(<WrappedComponent />);

  wrapper.update();

  expect(client.login.status).toBeCalledTimes(1);
});

test('Home component loaded successfully ', async () => {
  const Home = () => <div>Home Component</div>;

  const WrappedComponent = withSecurity({ sdk: client })(Home);

  const wrapper = mount(<WrappedComponent />);

  wrapper.update();

  expect(wrapper.find('div').text()).toEqual('Home Component');
});
