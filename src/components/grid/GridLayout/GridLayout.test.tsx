import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { initialLayoutMocked, initialcomponentsMocked } from 'mocks/gridMocks';
import sizeMe from 'react-sizeme';
import GridLayout from './GridLayout';

sizeMe.noPlaceholders = true;

const onRemoveItem = jest.fn();
const onLayoutChange = jest.fn();

describe('GridLayout', () => {
  it('should initialize components correctly', () => {
    const { getByTestId } = render(
      <GridLayout
        layouts={initialLayoutMocked}
        components={initialcomponentsMocked}
        onRemoveItem={onRemoveItem}
        onLayoutChange={onLayoutChange}
      />
    );
    initialcomponentsMocked.forEach(comp =>
      expect(getByTestId(comp.i)).toBeInTheDocument()
    );
  });

  it('should call onRemoveItem callback function correctly', () => {
    const { getByTestId } = render(
      <GridLayout
        layouts={initialLayoutMocked}
        components={initialcomponentsMocked}
        onRemoveItem={onRemoveItem}
        onLayoutChange={onLayoutChange}
      />
    );
    fireEvent.click(
      getByTestId(initialLayoutMocked[0].i).querySelector(
        'button'
      ) as HTMLInputElement
    );
    expect(onRemoveItem).toBeCalledTimes(1);
  });
});
