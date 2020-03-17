import React, { useContext, useRef, FC } from 'react';
import './MachineSelector.css';
import { AppContext, AppContextType } from '../../context/AppContextManager';

/**
 * This is the machine selector component.
 * Machines / Assets are taken from app context
 * and set the selected Machine in the appContext on dropdown select
 */
const MachineSelector: FC = () => {
  const appContext = useContext<AppContextType>(AppContext);

  const machineSelector = useRef<HTMLSelectElement>(null);

  const setSelectedMachine = () => {
    if (machineSelector.current) {
      const selectedMachineId = machineSelector.current.value;
      const selectedMachine = appContext.assets.find(
        asset => asset.id.toString() === selectedMachineId
      );
      appContext.setSelectedMachine(selectedMachine);
    }
  };

  return (
    <div className="MachineSelector">
      <div>
        <label htmlFor="machineSelector">Select Machine</label>
        <div className="machineSelectWrapper">
          <select
            id="machineSelector"
            className="machineSelectBox"
            ref={machineSelector}
            onChange={setSelectedMachine}
          >
            {appContext.assets
              ? appContext.assets.map(asset => {
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
