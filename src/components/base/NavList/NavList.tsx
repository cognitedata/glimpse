import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './NavList.css';

const NavList = (props: any) => {
  return (
    <List className="NavList">
      {props.navList.map((item: any, idx: number) => {
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

export default NavList;
