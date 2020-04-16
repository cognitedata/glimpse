// Copyright 2020 Cognite AS
import React, { FC, useRef, useEffect } from 'react';
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
import { RootState, RootAction } from 'StoreTypes';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AlarmType } from './interfaces';
import {
  startUpdateAlarms,
  stopUpdateAlarms,
  removeAlarm,
} from '../../store/actions/root-action';

/**
 * This is the alarm widget
 */
const Alarm: FC<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const alarmElement = useRef<HTMLDivElement>(null);

  /**
   * View more alarms
   */
  const onMoreAlarmsClick = () => {
    setAnchorEl(alarmElement.current);
  };

  /**
   * Select alarm
   */
  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    onMoreAlarmsClose();
  };

  const onRemoveAlarmClick = (index: number, alarmId: number) => {
    if (index !== 0 && index !== selectedIndex) {
      setSelectedIndex(0);
    }
    props.removeAlarm(alarmId);
  };

  const onMoreAlarmsClose = () => {
    setAnchorEl(null);
  };

  /**
   * Used to get same width and height of selected alarm div to alarms in the list
   */
  const menuItemStyles = () => {
    const alarmEl = alarmElement.current;
    return alarmEl
      ? {
          width: `${alarmEl.clientWidth}px`,
          height: `${alarmEl.clientHeight}px`,
        }
      : {};
  };

  const onUnmount = () => {
    props.stopUpdateAlarms();
  };

  useEffect(() => {
    props.startUpdateAlarms();
    return onUnmount;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return props.alarms && props.alarms.length > 0 ? (
    <div className="Alarm Alarm-list" ref={alarmElement}>
      <List component="nav" aria-label="Device settings">
        <ListItem aria-haspopup="true" aria-controls="lock-menu">
          <ListItemIcon>
            <RadioButtonCheckedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            className="AlarmType-text"
            primary={props.alarms[selectedIndex].type}
          />
          <ListItemText
            className="AlarmSubType-text"
            primary={props.alarms[selectedIndex].value}
            secondary={props.alarms[selectedIndex].subType}
          />
          <ListItemSecondaryAction>
            <IconButton
              className="Close-btn"
              edge="end"
              aria-label="delete"
              onClick={() => {
                props.removeAlarm(props.alarms[selectedIndex].id);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
          <ListItemSecondaryAction>
            <Badge
              badgeContent={props.alarms.length}
              color="secondary"
              invisible={props.alarms.length < 2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              onClick={onMoreAlarmsClick}
            >
              {null}
            </Badge>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Menu
        className="Alarm-menu Alarm-list"
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMoreAlarmsClose}
      >
        {props.alarms.map((alarm: AlarmType, index: number) =>
          index !== selectedIndex ? (
            <MenuItem
              key={alarm.id}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(index)}
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
                  onClick={() => {
                    onRemoveAlarmClick(index, alarm.id);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </MenuItem>
          ) : null
        )}
      </Menu>
    </div>
  ) : null;
};

const mapStateToProps = (state: RootState) => ({
  alarms: state.appState.alarms,
});

const dispatchProps = {
  startUpdateAlarms,
  stopUpdateAlarms,
  removeAlarm,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, dispatchProps)(Alarm);
