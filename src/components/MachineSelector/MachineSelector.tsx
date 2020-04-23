// Copyright 2020 Cognite AS
import React, { FC, useEffect } from 'react';
import './MachineSelector.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { Asset } from '@cognite/sdk';
import { Dispatch, bindActionCreators } from 'redux';

import { RootState, RootAction } from 'StoreTypes';

import { setAsset } from '../../store/actions/root-action';

/**
 * This is the machine selector component.
 * Machines / Assets are taken from app context
 * and set the selected Machine in the redux on dropdown select
 */
const MachineSelector: FC<Props> = (props: Props) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [selectItemList, setSelectItemList] = React.useState<JSX.Element[]>([]);

  const updateContext = (machineId: number) => {
    const selectedMachine = props.assets.find(
      (asset: Asset) => asset.id === machineId
    );
    if (selectedMachine !== undefined) {
      props.setAsset(selectedMachine);
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value) {
      updateContext(event.target.value as number);
    }
  };

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  useEffect(() => {
    const itemList = props.assets
      ? props.assets.map((asset: Asset) => {
          return (
            <MenuItem key={asset.id} value={asset.id}>
              {asset.name}
            </MenuItem>
          );
        })
      : null;
    setSelectItemList(itemList);
  }, [props.assets]);

  return (
    <div className="MachineSelector">
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} id="machineSelector-label">
          Select Machine
        </InputLabel>
        <Select
          labelId="machineSelector-label"
          id="machineSelector"
          value={props.asset && selectItemList.length > 0 ? props.asset.id : ''}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          {selectItemList}
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    asset: state.appState.asset,
    assets: state.appState.assets,
  };
};

const dispatchProps = {
  setAsset,
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(dispatchProps, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, dispatchProps)(MachineSelector);
