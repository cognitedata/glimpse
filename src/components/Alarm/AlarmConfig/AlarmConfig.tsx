// Copyright 2020 Cognite AS
import React, { FC, useState } from 'react';
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

import './AlarmConfig.css';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'StoreTypes';
import { connect } from 'react-redux';
import {
  setAlerts,
  startUpdateAlarms,
  stopUpdateAlarms,
} from 'store/actions/root-action';
import { APP_NAME } from 'constants/appData';
import cloneDeep from 'lodash/cloneDeep';

const ALARM_DOC_NAME = `${APP_NAME}_ALARM_CONFIG`;

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
 * This is the alarm configuration component
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

type FormField = {
  label: string;
  type: string;
  value?: string;
  invalid?: boolean;
};

type FormFields = { [key: string]: FormField };

type SavingConfig = { [key: string]: string };

/**
 * Field list in the form
 */
const defaultFormfields = {
  eventType: {
    label: 'Event Type',
    type: 'text',
    value: '',
  },
  eventSubtype: {
    label: 'Event Subtype',
    type: 'text',
    value: '',
  },
  metafieldKey: {
    label: 'Metafield Key',
    type: 'text',
    value: '',
  },
  pollingInterval: {
    label: 'Polling Interval',
    type: 'number',
    value: '10000',
  },
};

const AlarmConfig: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [formFields, setFormFields] = useState<FormFields>({});

  const handleClickOpen = () => {
    props.stopUpdateAlarms();
    setOpen(true);
    restoreAlarmConfig();
  };

  const handleClose = () => {
    props.startUpdateAlarms();
    setOpen(false);
  };

  /**
   * This is used to update the form fields with saved values
   */
  const restoreAlarmConfig = () => {
    const savedAlarmConfigStr = localStorage.getItem(ALARM_DOC_NAME);
    const initFormFields: FormFields = cloneDeep(defaultFormfields);
    if (savedAlarmConfigStr) {
      const savedAlarmConfig: { [key: string]: string } = JSON.parse(
        savedAlarmConfigStr
      );
      Object.keys(savedAlarmConfig).forEach(key => {
        if (savedAlarmConfig[key]) {
          initFormFields[key].value = savedAlarmConfig[key];
        }
      });
    }
    setFormFields(initFormFields);
  };

  /**
   * This is used to validate form befor saving
   */
  const validateForm = () => {
    const updatedFormFields: FormFields = {};
    const savingConfig: SavingConfig = {};
    let formInvalid = false;
    Object.keys(formFields).forEach(key => {
      const fieldValue = formFields[key].value;
      updatedFormFields[key] = {
        ...formFields[key],
        invalid: fieldValue === '' || fieldValue === undefined,
      };
      if (fieldValue === '' || fieldValue === undefined) {
        formInvalid = true;
      } else {
        savingConfig[key] = fieldValue;
      }
    });
    setFormFields(updatedFormFields);
    if (!formInvalid) {
      saveAlarmConfig(savingConfig);
    }
  };

  /**
   * This is used to save alarm configurations
   */
  const saveAlarmConfig = (savingConfig: SavingConfig) => {
    let actionStatus = true;
    try {
      localStorage.setItem(ALARM_DOC_NAME, JSON.stringify(savingConfig));
      handleClose();
    } catch (Error) {
      actionStatus = false;
    } finally {
      props.setAlerts({
        type: actionStatus ? 'success' : 'error',
        text: actionStatus ? 'Successfully saved!' : 'Error while saving!',
        hideApp: false,
      });
    }
  };

  /**
   * Update form fields on input change
   */
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldId = e.target.id;
    const fieldValue = e.target.value;
    setFormFields({
      ...formFields,
      [fieldId]: {
        ...formFields[fieldId],
        invalid: fieldValue === '',
        value: fieldValue,
      },
    });
  };

  return (
    <div className="AlarmConfig">
      <IconButton
        className="Config-button"
        edge="end"
        aria-label="Config"
        onClick={handleClickOpen}
      >
        <AddAlarmIcon />
      </IconButton>
      <Dialog
        data-testid="widgets-customizer-Modal"
        className="AlarmConfig-Modal"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Alarm Configuration
        </DialogTitle>
        <MuiDialogContent dividers>
          <form noValidate autoComplete="off">
            {Object.keys(formFields).map(key => (
              <TextField
                id={key.toString()}
                label={formFields[key].label}
                variant="outlined"
                type={formFields[key].type}
                defaultValue={formFields[key].value}
                error={formFields[key].invalid}
                onChange={onInputChange}
                helperText={
                  formFields[key].invalid
                    ? `${formFields[key].label} is required!`
                    : ''
                }
                required
              />
            ))}
          </form>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={validateForm} color="primary">
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
      </Dialog>
    </div>
  );
};

const dispatchProps = {
  setAlerts,
  startUpdateAlarms,
  stopUpdateAlarms,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(null, dispatchProps)(AlarmConfig);
