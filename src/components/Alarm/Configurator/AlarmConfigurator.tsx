// Copyright 2020 Cognite AS
import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import './AlarmConfigurator.css';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'StoreTypes';
import { connect } from 'react-redux';
import { setAlerts, restartUpdateAlarms } from 'store/actions/root-action';
import {
  saveAlarmFetchConfig,
  getAlarmFetchConfig,
} from 'services/alarmCRUD/alarmConfService';
import { AlarmFetchConfig } from './interfaces';

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
 * This component is used as alarm configurator and enabled only in settings page
 */

/**
 * Title component for alarm configuration popup
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

const defaultValues = {
  eventType: '',
  eventSubtype: '',
  metafieldKey: '',
  pollingInterval: 10,
  startTime: 24,
};

/**
 * This is the main functional component having the alarm configurator
 */
const AlarmConfigurator: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues,
  });

  const onError = (msg: string) => {
    props.setAlerts({
      type: 'error',
      text: msg,
      hideApp: false,
    });
  };

  /**
   * This will open the configurator popup on alarm settings icon click.
   * Alarms polling will be stopped when the popup opens.
   * restoreAlarmConfig function is used to fill the form fields with previously saved values
   */
  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      restoreAlarmConfig();
    }, 10);
  };

  /**
   * This will close the popup and start polling alarms
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * This is used to update the form fields with previously saved values
   */
  const restoreAlarmConfig = async () => {
    const savedAlarmConfig: {
      [key: string]: string;
    } = await getAlarmFetchConfig(onError);
    Object.keys(savedAlarmConfig).forEach(key => {
      if (savedAlarmConfig[key]) {
        setValue(key, savedAlarmConfig[key]);
      }
    });
  };

  /**
   * This function is used to save alarm configurations.
   * A alert will be displayed finally based on the saving status.
   */
  const saveAlarmConfig = async (data: AlarmFetchConfig) => {
    const actionStatus = await saveAlarmFetchConfig(data, onError);
    if (actionStatus) {
      props.restartUpdateAlarms();
      handleClose();
      props.setAlerts({
        type: 'success',
        text: 'Successfully saved!',
        hideApp: false,
      });
    }
  };

  /**
   * This function fires on form submit
   */
  const onSubmit = (data: AlarmFetchConfig) => {
    saveAlarmConfig(data);
  };

  return (
    <div className="AlarmConfigurator">
      <Tooltip title="Alarm Configurator">
        <IconButton
          className="Config-button"
          data-testid="config-button"
          edge="end"
          aria-label="Config"
          onClick={handleClickOpen}
        >
          <AddAlarmIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        data-testid="widgets-customizer-Modal"
        className="AlarmConfigurator-Modal"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Alarm Configuration
          </DialogTitle>
          <MuiDialogContent dividers>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Controller
                  label="Event Type"
                  as={<TextField id="eventType" variant="outlined" required />}
                  name="eventType"
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  label="Event Subtype"
                  as={
                    <TextField id="eventSubtype" variant="outlined" required />
                  }
                  name="eventSubtype"
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  label="Metafield Key"
                  as={
                    <TextField id="metafieldKey" variant="outlined" required />
                  }
                  name="metafieldKey"
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  label="Polling Interval (In Seconds)"
                  as={
                    <TextField
                      id="pollingInterval"
                      data-testid="pollingInterval"
                      type="number"
                      variant="outlined"
                      inputProps={{ min: '1' }}
                      required
                    />
                  }
                  name="pollingInterval"
                  control={control}
                />
              </Grid>

              <Grid item xs={9}>
                <Controller
                  label="Start Time"
                  as={
                    <TextField
                      id="startTime"
                      data-testid="startTime"
                      type="number"
                      variant="outlined"
                      inputProps={{ min: '1', max: '24' }}
                      required
                    />
                  }
                  name="startTime"
                  control={control}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  value="Hour(s) ago"
                  disabled
                  required
                />
              </Grid>
            </Grid>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button autoFocus type="submit" color="primary">
              Save
            </Button>
            <Button
              data-testid="close-button"
              onClick={handleClose}
              color="primary"
            >
              Close
            </Button>
          </MuiDialogActions>
        </form>
      </Dialog>
    </div>
  );
};

/**
 * Redux dispatch actions to connect to the component
 */
const dispatchProps = {
  setAlerts,
  restartUpdateAlarms,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(null, dispatchProps)(AlarmConfigurator);
