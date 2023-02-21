import { fireEvent, render, screen } from '@testing-library/react';

import TypeSwitch from '.';
import { GraphType } from '../types';

describe('TypeSwitch', () => {
  it('should show toggle for type', () => {
    render(
      <TypeSwitch
        blockId="test"
        selected={GraphType.Pie}
        types={[
          {
            type: GraphType.Pie,
            icon: <></>,
            label: 'Pie',
          },
        ]}
        setType={jest.fn()}
      />
    );
    expect(screen.getByTestId('Pie')).toBeInTheDocument();
  });

  it('should show radio for selected value checked', () => {
    render(
      <TypeSwitch
        blockId="test"
        selected={GraphType.Pie}
        types={[
          {
            type: GraphType.Pie,
            icon: <></>,
            label: 'Pie',
          },
        ]}
        setType={jest.fn()}
      />
    );
    expect(screen.getByTestId('Pie')).toBeChecked();
  });

  it('should call switch method passed in prop on click', () => {
    const setChecked = jest.fn();
    render(
      <TypeSwitch
        blockId="test"
        selected={GraphType.Pie}
        types={[
          {
            type: GraphType.Pie,
            icon: <></>,
            label: 'Pie',
          },
          {
            type: 'differentType' as unknown as GraphType,
            icon: <></>,
            label: 'Another',
          },
        ]}
        setType={setChecked}
      />
    );
    fireEvent.click(screen.getByTestId('Another'));
    expect(setChecked).toBeCalled();
  });
});
