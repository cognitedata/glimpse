// Copyright 2020 Cognite AS
import React, { FC } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './NavList.css';
import { NavLink } from 'react-router-dom';

type Props = {
  navList: NavListItem[];
  expanded: boolean;
};

/**
 * This component generates left side navigation list
 *
 * @param navList
 *    - Navigation item list
 */

const NavList: FC<Props> = ({ navList, expanded }: Props) => {
  return (
    <List className="NavList">
      {navList.map((item: NavListItem) => {
        return (
          <NavLink
            key={item.id}
            to={item.routeTo}
            style={{ textDecoration: 'none' }}
          >
            <div
              className={`Selection-highlighter ${
                expanded ? 'expanded' : 'collapsed'
              }`}
            >
              <ListItem button onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </div>
          </NavLink>
        );
      })}
    </List>
  );
};

export type NavListItem = {
  id: number;
  text: string;
  icon: JSX.Element;
  onClick?: undefined | (() => void);
  routeTo: string;
};

export default NavList;
