import React, { useState } from 'react';
import { generateRandomKey } from 'utills/utills';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { Layout } from 'react-grid-layout';
import { getEmptyPositions } from '../GridLayout/gridOperations';
import GridLayout from '../GridLayout/GridLayout';
import AddComponent from './AddComponent';
import { ComponentDetail } from '../interfaces';

const WithAddGridComponents = (WrappedComponent: any) => {
  const WrapperObject = () => {
    const initialLayout: Layout[] = [
      { i: 'a', x: 0, y: 0, w: 1, h: 1 },
      { i: 'b', x: 0, y: 1, w: 1, h: 1 },
      { i: 'c', x: 0, y: 2, w: 1, h: 2 },
      { i: 'd', x: 0, y: 4, w: 1, h: 1, static: true },
      { i: 'e', x: 0, y: 5, w: 1, h: 1 },
      { i: 'f', x: 1, y: 0, w: 1, h: 4 },
      { i: 'g', x: 2, y: 0, w: 1, h: 4 },
      { i: 'h', x: 3, y: 0, w: 1, h: 4 },
      // { i: 'i', x: 1, y: 4, w: 3, h: 2, component: '' },
    ];

    const initialcomponents: ComponentDetail[] = [
      { i: 'a', compName: 'a' },
      { i: 'b', compName: 'a' },
      { i: 'c', compName: 'a' },
      { i: 'd', compName: 'a' },
      { i: 'e', compName: 'a' },
      { i: 'f', compName: 'a' },
      { i: 'g', compName: 'a' },
      { i: 'h', compName: 'a' },
      // { i: 'i', compName: 'a' },
    ];

    const [components, setComponents] = useState(initialcomponents);
    const [layouts, setLayouts] = useState(initialLayout);

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
