import { FC } from 'react';

import { Alert } from 'react-bootstrap';

import { ErrorMessageProps } from './types';

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return (
    <Alert variant="danger" className="mb-0">
      Error when fetching response: {error.message}
    </Alert>
  );
};

export default ErrorMessage;
