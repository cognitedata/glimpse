// Copyright 2020 Cognite AS
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RouterPaths } from 'constants/router';
import NavList from './NavList';

const navList = [
  {
    id: 1,
    text: 'Overview',
    icon: <></>,
    routeTo: RouterPaths.OVERVIEW,
  },
  {
    id: 2,
    text: 'Settings',
    icon: <></>,
    routeTo: RouterPaths.SETTINGS,
  },
  {
    id: 3,
    text: 'Feedback',
    icon: <></>,
    routeTo: RouterPaths.FEEDBACK,
  },
  {
    id: 4,
    text: 'Log out',
    icon: <></>,
    routeTo: RouterPaths.LOGOUT,
  },
];

describe('Navigation List', () => {
  test('Display navigation links', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavList navList={navList} expanded={false} />
      </BrowserRouter>
    );
    navList.forEach(navLink => {
      expect(getByText(navLink.text).closest('a')).toHaveAttribute(
        'href',
        navLink.routeTo
      );
    });
  });

  test('Display navigation link Names', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavList navList={navList} expanded={false} />
      </BrowserRouter>
    );
    navList.forEach(navLink => {
      expect(getByText(navLink.text)).toBeInTheDocument();
    });
  });

  test('Expand Navigation', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavList navList={navList} expanded />
      </BrowserRouter>
    );
    navList.forEach(navLink => {
      expect(getByText(navLink.text).closest('a')?.firstChild).toHaveClass(
        'expanded'
      );
    });
  });

  test('Collapse Navigation', async () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <NavList navList={navList} expanded={false} />
      </BrowserRouter>
    );
    navList.forEach(navLink => {
      expect(getByText(navLink.text).closest('a')?.firstChild).toHaveClass(
        'collapsed'
      );
    });
  });
});
