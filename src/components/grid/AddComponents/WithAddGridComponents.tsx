import React, { useState } from 'react';
import { generateRandomKey } from 'utills/utills';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import { initialcomponentsMocked, initialLayoutMocked } from 'mocks/gridMocks';
import { getEmptyPositions } from '../GridLayout/gridOperations';
import GridLayout from '../GridLayout/GridLayout';
import AddComponent from './AddComponent';
import { ComponentDetail } from '../interfaces';

const WithAddGridComponents = (WrappedComponent: any) => {
  const WrapperObject = () => {
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
          // eslint-disable-next-line no-alert
          alert('There is no position to add the component');
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
      // eslint-disable-next-line no-alert
      alert('1 <= width <=4 and 1 <= height <= 6');
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
