import React, { useState, useContext } from 'react';
import { generateRandomKey } from 'utills/utills';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import { initialcomponentsMocked, initialLayoutMocked } from 'mocks/gridMocks';
import { AppContextType, AppContext } from 'context/AppContextManager';
import { getEmptyPositions } from '../GridLayout/gridOperations/gridOperations';
import GridLayout from '../GridLayout/GridLayout';
import AddComponent from './AddComponent';
import { ComponentDetail } from '../interfaces';

const WithAddGridComponents = (WrappedComponent: any) => {
  const WrapperObject = () => {
    const appContext = useContext<AppContextType>(AppContext);
    const [components, setComponents] = useState(initialcomponentsMocked);
    const [layouts, setLayouts] = useState(initialLayoutMocked);

    const addElement = (height: number, width: number) => {
      if (height > 0 && height <= 6 && width > 0 && width <= 4) {
        const cordinates = getEmptyPositions(
          layouts,
          width,
          height,
          MAXCOLS,
          MAXROWS
        );
        if (!cordinates) {
          appContext.setAlerts({
            type: 'error',
            text: 'There is no position for adding the component',
            duration: 50000,
            hideApp: false,
          });
          return;
        }
        const key = generateRandomKey();
        setComponents((prevComponents: ComponentDetail[]) => {
          prevComponents.push({ i: key, compName: 'a' });
          return prevComponents;
        });
        setLayouts((prevLayout: Layout[]) => {
          const newLayout = [...prevLayout];
          newLayout.push({
            i: key,
            x: cordinates[0],
            y: cordinates[1],
            w: width,
            h: height,
          });
          return newLayout;
        });
        return;
      }
      appContext.setAlerts({
        type: 'error',
        text: '1 <= width <=4 and 1 <= height <= 6',
        duration: 10000,
        hideApp: false,
      });
    };

    const onRemoveItem = (key: string) => {
      setLayouts((prevLayout: Layout[]) =>
        prevLayout.filter((compDetails: Layout) => compDetails.i !== key)
      );
      setComponents((prevComponets: ComponentDetail[]) =>
        prevComponets.filter(
          (compDetails: ComponentDetail) => compDetails.i !== key
        )
      );
    };

    const onLayoutChange = (newLayout: Layout[]) => {
      setLayouts(newLayout);
    };

    return (
      <>
        <AddComponent addElement={addElement} />
        <WrappedComponent
          layouts={layouts}
          components={components}
          onRemoveItem={onRemoveItem}
          onLayoutChange={onLayoutChange}
        />
      </>
    );
  };
  return WrapperObject;
};
export default WithAddGridComponents(GridLayout);
