import React, { useState } from 'react';
import { generateRandomKey } from 'utills/utills';
import { MAXCOLS, MAXROWS } from 'constants/grid';
import { getEmptyPositions } from '../GridLayout/gridOperations';
import GridLayout from '../GridLayout/GridLayout';
import AddComponent from './AddComponent';

const WithAddGridComponents = (WrappedComponent: any) => {
  const WrapperObject = () => {
    const initialLayout: any = [
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

    const initialcomponents: any = [
      { i: 'a', component: 'a', props: {} },
      { i: 'b', component: 'a', props: {} },
      { i: 'c', component: 'a', props: {} },
      { i: 'd', component: 'a', props: {} },
      { i: 'e', component: 'a', props: {} },
      { i: 'f', component: 'a', props: {} },
      { i: 'g', component: 'a' },
      { i: 'h', component: 'a' },
      // { i: 'i', component: 'a' },
    ];

    const [components, setComponents] = useState(initialcomponents);
    const [layout, setLayout] = useState(initialLayout);

    const addElement = (height: number, width: number) => {
      if (height > 0 && height <= 6 && width > 0 && width <= 4) {
        const cordinates = getEmptyPositions(
          layout,
          width,
          height,
          MAXCOLS,
          MAXROWS
        );
        if (!cordinates) {
          // eslint-disable-next-line no-alert
          alert('no position to add the component');
          return;
        }
        const key = generateRandomKey();
        setComponents((prevComponents: any) => {
          prevComponents.push({ i: key, component: 'a' });
          return prevComponents;
        });
        setLayout((prevLayout: any) => {
          const newLayout = [...prevLayout];
          newLayout.push({
            i: key,
            x: cordinates[0],
            y: cordinates[1],
            w: width,
            h: height,
            component: '',
          });
          return newLayout;
        });
        return;
      }
      // eslint-disable-next-line no-alert
      alert('1 <= width <=4 and 1 <= height <= 6');
    };

    const onRemoveItem = (key: string) => {
      setLayout((prevLayout: any[]) =>
        prevLayout.filter((compDetails: any) => compDetails.i !== key)
      );
      setComponents((prevComponets: any[]) =>
        prevComponets.filter((compDetails: any) => compDetails.i !== key)
      );
    };

    const onLayoutChange = (newLayout: any) => {
      setLayout(newLayout);
    };

    return (
      <>
        <AddComponent addElement={addElement} />
        <WrappedComponent
          layout={layout}
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
