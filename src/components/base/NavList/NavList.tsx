import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './NavList.css';

type Props = {
  navList: NavListItem[];
};

const NavList: React.FC<Props> = ({ navList }: Props) => {
  return (
    <List className="NavList">
      {navList.map((item: NavListItem) => {
        return (
          <ListItem key={item.id} button onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
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
};

export default NavList;
