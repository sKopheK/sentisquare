import { render } from '@testing-library/react';
import ErrorMessage from './error';

describe('ResultList - Error component', () => {
  it('should render component', () => {
    expect(() =>
      render(
        <ErrorMessage error={{ name: "L'error", message: 'Ay, caramba!' }} />
      )
    ).not.toThrow();
  });

  it('should render element with alert role', () => {
    const { getByRole } = render(
      <ErrorMessage error={{ name: "L'error", message: 'Ay, caramba!' }} />
    );
    expect(getByRole('alert')).toBeInTheDocument();
  });
});
