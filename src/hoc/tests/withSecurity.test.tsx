import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
// import { configure, mount, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import withSecurity from 'hoc/WithSecurity';
import { AppContext, defaultContextObj } from '../../context/AppContextManager';
import { MockCogniteClient, groupList } from '../../mocks';

const loginStatus = jest.fn();

loginStatus.mockReturnValueOnce(false).mockReturnValueOnce({
  user: 'test user',
  loggedIn: true,
  project: 'test project',
  projectId: 204967111817541,
});

const mockContext = {
  ...defaultContextObj,
  loggedIn: true,
};

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

// configure({ adapter: new Adapter() });

const client = new CogniteClient({ appId: 'mock app' });

beforeEach(() => {
  client.groups.list.mockReturnValue(groupList);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Authorization status checked successfully ', async () => {
  const Home = () => <div>Home Component</div>;
  const WrappedComponent = withSecurity({ sdk: client })(Home);
  render(
    <AppContext.Provider value={mockContext}>
      <WrappedComponent />
    </AppContext.Provider>
  );
  expect(client.login.status).toBeCalledTimes(1);
});

test('Home component loaded successfully when the login status is updated', async () => {
  const Home = () => <div>Home Component</div>;
  const WrappedComponent = withSecurity({ sdk: client })(Home);
  const { getByText, container } = render(
    <AppContext.Provider value={mockContext}>
      <WrappedComponent />
    </AppContext.Provider>
  );
  expect(getByText('Home Component')).toBeInTheDocument();
});
