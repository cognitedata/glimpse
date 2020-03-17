import React, { useContext, FC, useEffect } from 'react';
import './MachineSelector.css';
import { AppContext, AppContextType } from '../../context/AppContextManager';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * This is the machine selector component.
 * Machines / Assets are taken from app context
 * and set the selected Machine in the appContext on dropdown select
 */
const MachineSelector: FC = () => {
  const appContext = useContext<AppContextType>(AppContext);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [selectItemList, setSelectItemList] = React.useState<
    JSX.Element[] | null
  >([]);

  const updateContext = (machineId: number) => {
    const selectedMachine = appContext.assets.find(
      asset => asset.id === machineId
    );
    appContext.setSelectedMachine(selectedMachine);
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
    const itemList = appContext.assets
      ? appContext.assets.map(asset => {
          return (
            <MenuItem key={asset.id} value={asset.id}>
              {asset.name}
            </MenuItem>
          );
        })
      : null;
    setSelectItemList(itemList);
  }, [appContext.assets]);

  return (
    <div className="MachineSelector">
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} id="machineSelector-label">
          Select Machine
        </InputLabel>
        <Select
          labelId="machineSelector-label"
          id="machineSelector"
          value={
            appContext.selectedMachine ? appContext.selectedMachine.id : ''
          }
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          {selectItemList}
        </Select>
      </FormControl>
    </div>
  );
};

export default MachineSelector;
