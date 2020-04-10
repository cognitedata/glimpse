// Copyright 2020 Cognite AS
import React, { useRef } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import './Alarm.css';

type AlarmType = {
  id: number;
  type: String;
  subType: String;
  value: String;
};

type AlarmProp = {
  alarms: AlarmType[];
};

const alarms: AlarmType[] = [
  { id: 1, type: 'Alarm', subType: 'Air Pressure Down', value: '203' },
  { id: 2, type: 'Alarm 2', subType: 'Air Pressure Down 2', value: '233' },
  { id: 3, type: 'Alarm 3', subType: 'Air Pressure Down 3', value: '888' },
];

export default function Alarm() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const alarmElement = useRef<HTMLDivElement>(null);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(alarmElement.current);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemStyles = () => {
    const alarmEl = alarmElement.current;
    return alarmEl
      ? {
          width: `${alarmEl.clientWidth}px`,
          height: `${alarmEl.clientHeight}px`,
        }
      : {};
  };

  return (
    <div className="Alarm Alarm-list" ref={alarmElement}>
      <List component="nav" aria-label="Device settings">
        <ListItem aria-haspopup="true" aria-controls="lock-menu">
          <ListItemIcon>
            <RadioButtonCheckedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            className="AlarmType-text"
            primary={alarms[selectedIndex].type}
          />
          <ListItemText
            className="AlarmSubType-text"
            primary={alarms[selectedIndex].value}
            secondary={alarms[selectedIndex].subType}
          />
          <ListItemSecondaryAction>
            <IconButton className="Close-btn" edge="end" aria-label="delete">
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
          <Badge
            badgeContent={17}
            color="secondary"
            invisible={alarms.length < 2}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            onClick={handleClickListItem}
          >
            {null}
          </Badge>
        </ListItem>
      </List>
      <Menu
        className="Alarm-menu Alarm-list"
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {alarms.map((alarm, index) =>
          index !== selectedIndex ? (
            <MenuItem
              key={alarm.id}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(event, index)}
              style={menuItemStyles()}
            >
              <ListItemIcon>
                <RadioButtonCheckedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText className="AlarmType-text" primary={alarm.type} />
              <ListItemText
                className="AlarmSubType-text"
                primary={alarm.value}
                secondary={alarm.subType}
              />
              <ListItemSecondaryAction>
                <IconButton
                  className="Close-btn"
                  edge="end"
                  aria-label="delete"
                  onClick={handleClickListItem}
                >
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </MenuItem>
          ) : null
        )}
      </Menu>
    </div>
  );
}
