import React, { useContext, useRef } from 'react';
import './MachineSelector.css';
import { AppContext } from '../../context/AppContextManager';

const MachineSelector = (props: any) => {
  const appContext: any = useContext(AppContext);

  const machineSelector = useRef<HTMLSelectElement>(null);

  const setSelectedMachine = () => {
    if (machineSelector.current) {
      const selectedMachineId = machineSelector.current.value;
      const selectedMachine = props.assets.find(
        (asset: any) => asset.id.toString() === selectedMachineId
      );
      appContext.setSelectedMachine(selectedMachine);
    }
  };

  return (
    <div className="MachineSelector">
      <div>
        <label htmlFor="MachineSelector">Select Machine</label>
        <div className="selectWrapper">
          <select
            id="machineSelector"
            className="selectBox"
            ref={machineSelector}
            onChange={setSelectedMachine}
          >
            {props.assets
              ? props.assets.map((asset: any) => {
                  return (
                    <option key={asset.id} value={asset.id}>
                      {asset.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MachineSelector;
