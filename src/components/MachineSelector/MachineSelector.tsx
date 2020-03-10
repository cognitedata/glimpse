import React, { useContext, useRef } from 'react';
import './MachineSelector.css';
import { Asset } from '@cognite/sdk';
import { AppContext, AppContextType } from '../../context/AppContextManager';

type Props = {
  assets: Asset[];
};

const MachineSelector: React.FC<Props> = ({ assets }: Props) => {
  const appContext = useContext<AppContextType>(AppContext);

  const machineSelector = useRef<HTMLSelectElement>(null);

  const setSelectedMachine = () => {
    if (machineSelector.current) {
      const selectedMachineId = machineSelector.current.value;
      const selectedMachine = assets.find(
        asset => asset.id.toString() === selectedMachineId
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
            {assets
              ? assets.map(asset => {
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
