// Copyright 2020 Cognite AS
import React, { useEffect, useState, FC } from 'react';
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
import { WidgetConfigProps } from 'components/widgetConfigs/event/interfaces';
import store from 'store';
import { SET_NEW_WIDGET } from 'store/actions/actionTypes';
import { WidgetConfig } from 'components/grid/interfaces';

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

type SizeWidgetKeyMapping = {
  [key: string]: string[];
};

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

export default function WidgetsCustomizer() {
  const [open, setOpen] = useState(false);
  const [selectedWidgetKey, setSelectedWidgetKey] = useState(
    Object.keys(WIDGET_SETTINGS)[0]
  );
  const [widgetSizeFilter, setWidgetSizeFilter] = useState('All');
  const [defaultWidgetSizeFilter, setDefaultWidgetSizeFilter] = useState('All');
  const [sizeWidgetKeyMapping, setSizeWidgetKeyMapping] = useState<
    SizeWidgetKeyMapping
  >();

  const handleListItemClick = (key: string) => {
    setSelectedWidgetKey(key);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setDefaultWidgetSizeFilter('All');
    setWidgetSizeFilter('All');
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * This returns formated widget size string
   */
  const getSizeString = (key: string) =>
    `${WIDGET_SETTINGS[key].size[0]} x ${WIDGET_SETTINGS[key].size[1]}`;

  const filterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value) {
      const selectedSize = event.target.value as string;
      setWidgetSizeFilter(selectedSize);
      if (sizeWidgetKeyMapping) {
        const topWidgetKey = sizeWidgetKeyMapping[selectedSize][0];
        setSelectedWidgetKey(topWidgetKey);
      }
    }
  };

  const onCreate = (data: WidgetConfig) => {
    const widgetConf = { ...data };
    widgetConf.widgetTypeId = selectedWidgetKey;
    store.dispatch({
      type: SET_NEW_WIDGET,
      payload: widgetConf,
    });
    setOpen(false);
  };
  /**
   * Get distinct size list from widget settings and update size widget key mapping
   */
  const updateSizeMapping = () => {
    const tempSizeWidgetKeyMapping: SizeWidgetKeyMapping = { All: [] };
    Object.keys(WIDGET_SETTINGS).forEach((key, index) => {
      const sizeString = getSizeString(key);
      tempSizeWidgetKeyMapping.All.push(key);
      if (tempSizeWidgetKeyMapping[sizeString]) {
        tempSizeWidgetKeyMapping[sizeString].push(key);
      } else {
        tempSizeWidgetKeyMapping[sizeString] = [key];
      }
    });
    setSizeWidgetKeyMapping(tempSizeWidgetKeyMapping);
  };

  useEffect(() => {
    updateSizeMapping();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const Configurator: FC<WidgetConfigProps> =
    WIDGET_SETTINGS[selectedWidgetKey].configurator;
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
                    defaultValue={defaultWidgetSizeFilter}
                    onChange={filterChange}
                    labelWidth={FILTER_LABEL_WIDTH}
                  >
                    {sizeWidgetKeyMapping
                      ? Object.keys(sizeWidgetKeyMapping).map(key => (
                          <MenuItem key={key} value={key}>
                            {key}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </div>
              <Divider />
              <div className="WidgetList-holder">
                <List component="nav" aria-label="main mailbox folders">
                  {sizeWidgetKeyMapping
                    ? sizeWidgetKeyMapping[widgetSizeFilter].map(key => (
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
                      ))
                    : null}
                </List>
              </div>
            </Box>
            <Box p={1} m={0.5} width="80%" className="WidgetConfig-Column">
              <div className="title">
                {WIDGET_SETTINGS[selectedWidgetKey].name}
                {/* <span>({getSizeString(selectedWidgetKey)})</span> */}
              </div>
              <div className="preview">
                <img
                  src={WIDGET_SETTINGS[selectedWidgetKey].image}
                  alt={WIDGET_SETTINGS[selectedWidgetKey].name}
                />
              </div>
              <Box width="100%">
                {Configurator && <Configurator onCreate={onCreate} />}
              </Box>
            </Box>
          </Box>
        </MuiDialogContent>
        <MuiDialogActions>
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
