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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import BuildIcon from '@material-ui/icons/Build';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './MachineConfigurator.css';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'StoreTypes';
import { connect } from 'react-redux';
import { setAlerts, updateAssets } from 'store/actions/root-action';
import { getMachineIds, saveMachineIds } from 'services/appCRUD/appConfService';
import { validateAsset } from './assetValidator';

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
 * This component is used as machine configurator and enabled only in settings page for admin users
 */

/**
 * Title component for machine configuration popup
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
  assetExternalId: string;
};

const defaultValues = {
  assetExternalId: '',
};

/**
 * This is the main functional component having the machine configurator
 */
const MachineConfigurator: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [assetExternalIds, setAssetExternalIds] = useState<string[]>([]);
  const [assetValidating, setAssetValidating] = useState(false);

  const onError = (msg: string) => {
    props.setAlerts({
      type: 'error',
      text: msg,
      hideApp: false,
    });
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });

  /**
   * This will open the configurator popup on machine settings icon click.
   * restoreMachineConfig function is used to fill the form fields with previously saved values
   */
  const handleClickOpen = () => {
    setOpen(true);
    restoreMachineConfig();
  };

  /**
   * This will close the popup
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * This is used to update the form fields with previously saved values
   */
  const restoreMachineConfig = async () => {
    const savedMachineConfigStr = await getMachineIds(onError);
    if (savedMachineConfigStr) {
      setAssetExternalIds(savedMachineConfigStr.split(','));
    }
  };

  /**
   * This function is used to validate asset external ids list before it is saved.
   * This will check if the list empty and show the alert accordingly.
   */
  const isValidAssetIdList = () => {
    if (assetExternalIds.length === 0) {
      props.setAlerts({
        type: 'warning',
        text: 'Atleast one Asset External Id is required!',
        hideApp: false,
      });
      return false;
    }
    return true;
  };

  /**
   * This function is used to save machine configurations.
   * A alert will be displayed finally based on the saving status.
   */
  const saveMachineConfig = async () => {
    if (isValidAssetIdList()) {
      const actionStatus = await saveMachineIds(
        assetExternalIds.join(','),
        onError
      );
      if (actionStatus) {
        handleClose();
        /** This is used to update the assets list in the state with the newly entered asset external ids */
        props.updateAssets();
        props.setAlerts({
          type: 'success',
          text: 'Successfully saved!',
          hideApp: false,
        });
      }
    }
  };

  /**
   * This method is used to remove asset id from the list
   */
  const removeAssetId = (id: string) => {
    const idList = assetExternalIds.filter(
      assetExternalId => assetExternalId !== id
    );
    setAssetExternalIds(idList);
  };

  /**
   * This method is used to add asset id to the list
   */
  const addAssetId = (assetId: string) => {
    setAssetExternalIds([assetId, ...assetExternalIds]);
    reset();
  };

  /**
   * This method is used to validate asset external id before it is added to the list
   */
  const validateAssetId = async (assetId: string) => {
    if (assetExternalIds.includes(assetId)) {
      onError('Asset External Id is already added!');
    } else {
      setAssetValidating(true);
      const assetIdStatus = await validateAsset(assetId);
      setAssetValidating(false);
      if (assetIdStatus) {
        addAssetId(assetId);
      } else {
        onError('Asset not found!');
      }
    }
  };

  /**
   * This function fires on form submit
   */
  const onSubmit = (data: FormField) => {
    validateAssetId(data.assetExternalId);
  };

  return (
    <div className="MachineConfigurator">
      {/* This button is used to open the popup */}
      <Tooltip title="Machine Configurator">
        <IconButton
          className="Config-button"
          data-testid="machine-configurator-btn"
          edge="end"
          aria-label="Config"
          onClick={handleClickOpen}
        >
          <BuildIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        className="MachineConfigurator-Modal"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* Popup title */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Machine Configuration
        </DialogTitle>
        <MuiDialogContent dividers>
          <Grid container spacing={1}>
            <Grid container>
              {/* This form contains input field for asset external id and a button to add it to the list */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={11}>
                  {/* Input field for asset external id */}
                  <Controller
                    label="Asset External Id"
                    className="Asset-external-id-input"
                    as={
                      <TextField
                        id="assetExternalId"
                        variant="outlined"
                        required
                      />
                    }
                    name="assetExternalId"
                    control={control}
                  />
                  {/* Loader icon to show while asset external id is getting validated */}
                  {assetValidating ? (
                    <CircularProgress
                      className="Asset-validator-loader"
                      color="secondary"
                    />
                  ) : null}
                </Grid>
                <Grid item xs={1}>
                  {/* This button is used to submit the asset external id */}
                  <IconButton
                    className="Add-button"
                    edge="end"
                    aria-label="Config"
                    title="Add"
                    type="submit"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              </form>
            </Grid>

            {/* This will show the list of asset external ids in disabled input fields 
             and buttons to remove ids from the list */}
            {assetExternalIds.map((assetExternalId, index) => (
              <Grid
                key={`assetIdContainer${assetExternalId}`}
                container
                spacing={1}
              >
                <Grid item xs={11}>
                  <TextField
                    id={`assetExternalId${index}`}
                    variant="outlined"
                    value={assetExternalId}
                    disabled
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    className="Remove-button"
                    edge="end"
                    aria-label="Config"
                    onClick={() => removeAssetId(assetExternalId)}
                    title="Remove"
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </MuiDialogContent>
        <MuiDialogActions>
          {/* This button is used to save the machine config */}
          <Button color="primary" onClick={saveMachineConfig}>
            Save
          </Button>
          {/* This button is used to close the popup */}
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

/**
 * Redux dispatch actions to connect to the component
 */
const dispatchProps = {
  setAlerts,
  updateAssets,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(null, dispatchProps)(MachineConfigurator);
