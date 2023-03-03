import { render } from '@testing-library/react';
import ValueRange from '.';

describe('ValueRange component', () => {
  it('should render component', () => {
    expect(() =>
      render(
        <ValueRange
          height={20}
          max={10}
          min={0}
          setValues={() => undefined}
          values={[1, 10]}
        />
      )
    ).not.toThrow();
  });
});
