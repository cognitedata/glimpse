// Copyright 2020 Cognite AS
import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './WidgetsCustomizer.css';

import WIDGET_SETTINGS from 'constants/widgetSettings';

const FILTER_LABEL_WIDTH = 95;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * This is the widget customizer component.
 */

/**
 * Title component for widget customizer popup
 */
const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function CustomizedDialogs() {
  const [open, setOpen] = useState(false);
  const [selectedWidgetKey, setSelectedWidgetKey] = useState('0');
  const [sizeItemList, setSizeItemList] = useState<JSX.Element[] | null>([]);
  const [filterSize, setFilterSize] = useState('all');
  const [defaultFilterSize, setDefaultFilterSize] = useState('all');

  const handleListItemClick = (key: string) => {
    setSelectedWidgetKey(key);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setDefaultFilterSize('all');
    setFilterSize('all');
    setSelectedWidgetKey('0');
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * This returns formated widget size string
   */
  const getSizeString = (widgetSettings: typeof WIDGET_SETTINGS, key: string) =>
    `${widgetSettings[key].size[0]} x ${widgetSettings[key].size[1]}`;

  /**
   * Filter function to filter widget list based on the selected size
   */
  const widgetsKeyFilter = (value: string) => (key: string) =>
    value === 'all' || value === getSizeString(WIDGET_SETTINGS, key);

  const filterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value) {
      const tempFilterSize = event.target.value as string;
      setFilterSize(tempFilterSize);
      const topWidgetKey = Object.keys(WIDGET_SETTINGS).filter(
        widgetsKeyFilter(tempFilterSize)
      )[0];
      setSelectedWidgetKey(topWidgetKey);
    }
  };

  /**
   * Get distinct size list from widget settings and create list elements for size filter
   */
  const updateSizeList = () => {
    const sizeList = new Set<string>();
    Object.keys(WIDGET_SETTINGS).forEach((key, index) => {
      sizeList.add(getSizeString(WIDGET_SETTINGS, key));
    });
    const tempSizeItemList = Array.from(sizeList).map(size => {
      return (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      );
    });
    setSizeItemList(tempSizeItemList);
  };

  useEffect(() => {
    updateSizeList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="WidgetsCustomizer">
      <Button
        data-testid="add-button"
        variant="outlined"
        color="primary"
        className="Add-button"
        onClick={handleClickOpen}
      >
        +
      </Button>
      <Dialog
        data-testid="widgets-customizer-Modal"
        className="WidgetsCustomizer-Modal"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Widget
        </DialogTitle>
        <MuiDialogContent dividers>
          <Box display="flex" height="100%">
            <Box p={1} m={0.5} width="20%" className="WidgetList-Column">
              <div className="Widget-filter">
                <FormControl variant="outlined">
                  <InputLabel id="widgetFilter-label">
                    Filter by size
                  </InputLabel>
                  <Select
                    labelId="widgetFilter-label"
                    id="widgetFilter"
                    defaultValue={defaultFilterSize}
                    onChange={filterChange}
                    labelWidth={FILTER_LABEL_WIDTH}
                  >
                    <MenuItem key="all" value="all">
                      All
                    </MenuItem>
                    {sizeItemList}
                  </Select>
                </FormControl>
              </div>
              <Divider />
              <div className="WidgetList-holder">
                <List component="nav" aria-label="main mailbox folders">
                  {Object.keys(WIDGET_SETTINGS)
                    .filter(widgetsKeyFilter(filterSize))
                    .map((key, index) => (
                      <ListItem
                        key={key}
                        button
                        selected={selectedWidgetKey === key}
                        onClick={() => handleListItemClick(key)}
                      >
                        <div className="WidgetInfo-holder">
                          <div className="Name-holder">
                            {WIDGET_SETTINGS[key].name}
                          </div>
                          <div>
                            <img
                              src={WIDGET_SETTINGS[key].image}
                              alt={WIDGET_SETTINGS[key].name}
                              width="100%"
                            />
                          </div>
                        </div>
                      </ListItem>
                    ))}
                </List>
              </div>
            </Box>
            <Box p={1} m={0.5} width="80%" className="WidgetConfig-Column">
              <div className="title">
                {WIDGET_SETTINGS[selectedWidgetKey].name}
                <span>
                  ({getSizeString(WIDGET_SETTINGS, selectedWidgetKey)})
                </span>
              </div>
              <div className="preview">
                <img
                  src={WIDGET_SETTINGS[selectedWidgetKey].image}
                  alt={WIDGET_SETTINGS[selectedWidgetKey].name}
                />
              </div>
            </Box>
          </Box>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Create
          </Button>
          <Button
            data-testid="close-button"
            onClick={handleClose}
            color="primary"
          >
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
