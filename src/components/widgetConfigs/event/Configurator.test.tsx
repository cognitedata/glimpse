// Copyright 2020 Cognite AS
import { eventList } from 'mocks/eventList';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import React from 'react';
import { EventFourMetaConfigurator } from './Configurator';
import * as eventFetcher from './eventFetcher';

jest.mock('./eventFetcher.tsx');
const fetchEvents = jest.fn().mockImplementation(async () => {
  return eventList.items;
});
// @ts-ignore
eventFetcher.fetchEvents = fetchEvents;

const onCreate = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
  // @ts-ignore
  eventFetcher.fetchEvents = fetchEvents;
});

describe('Events Widget Configurator', () => {
  it('should initially show only the section 1', async () => {
    const { getByTestId, queryByTestId } = render(
      <EventFourMetaConfigurator onCreate={onCreate} />
    );
    expect(getByTestId('section1')).toBeInTheDocument();
    expect(queryByTestId('section2')).toBeNull();
  });

  it('should render section 2 after clicking proceed button', async () => {
    const { getByTestId, container } = render(
      <EventFourMetaConfigurator onCreate={onCreate} />
    );
    fireEvent.click(getByTestId('proceed-button'));
    await waitForElement(() => getByTestId('section2'), {
      container,
    });
    expect(fetchEvents).toBeCalledTimes(1);
    expect(getByTestId('section1')).toBeInTheDocument();
    expect(getByTestId('section2')).toBeInTheDocument();
  });

  it('should show error message if no events found', async () => {
    // @ts-ignore
    eventFetcher.fetchEvents = jest.fn().mockImplementation(async () => {
      return [];
    });
    const { getByTestId, queryByTestId, container } = render(
      <EventFourMetaConfigurator onCreate={onCreate} />
    );
    fireEvent.click(getByTestId('proceed-button'));
    await waitForElement(() => getByTestId('error-msg'), {
      container,
    });
    expect(getByTestId('section1')).toBeInTheDocument();
    expect(queryByTestId('section2')).toBeNull();
    expect(getByTestId('error-msg')).toBeInTheDocument();
  });

  it('should disable initial section after fetching events', async () => {
    const {
      getByTestId,
      queryByTestId,
      queryByLabelText,
      container,
      queryByPlaceholderText,
    } = render(<EventFourMetaConfigurator onCreate={onCreate} />);
    fireEvent.click(getByTestId('proceed-button'));
    await waitForElement(() => getByTestId('section2'), {
      container,
    });
    expect(queryByTestId('section2')).not.toBeNull();
    expect(queryByPlaceholderText(/Event Type/i)).toHaveAttribute('disabled');
    expect(queryByPlaceholderText(/Event Subtype/i)).toHaveAttribute(
      'disabled'
    );
    expect(queryByLabelText(/Is Ongoing/i)).toHaveAttribute('disabled');
  });

  it('should reset the form after clicking reset button', async () => {
    const {
      getByTestId,
      queryByTestId,
      queryByLabelText,
      container,
      queryByPlaceholderText,
    } = render(<EventFourMetaConfigurator onCreate={onCreate} />);
    fireEvent.click(getByTestId('proceed-button'));
    await waitForElement(() => getByTestId('section2'), {
      container,
    });
    fireEvent.click(getByTestId('reset-button'));
    expect(queryByTestId('section2')).toBeNull();
    expect(queryByPlaceholderText(/Event Type/i)).not.toHaveAttribute(
      'disabled'
    );
    expect(queryByPlaceholderText(/Event Subtype/i)).not.toHaveAttribute(
      'disabled'
    );
    expect(queryByLabelText(/Is Ongoing/i)).not.toHaveAttribute('disabled');
  });
});
