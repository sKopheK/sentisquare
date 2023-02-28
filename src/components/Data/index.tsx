import { FC, useContext } from 'react';

import FileUpload from 'components/FileUpload';
import { ActionType } from 'components/constants';
import { AppContext } from 'components/context';
import { Alert, Button } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';

const Data: FC = () => {
  const { fileContent, dispatch } = useContext(AppContext);

  const handleOnReset = () => dispatch([ActionType.reset]);

  return (
    <>
      {fileContent.length === 0 ? (
        <FileUpload />
      ) : (
        <>
          <Alert>
            <div className="d-flex align-items-center gap-2">
              <BsCheckCircleFill />
              File content loaded
            </div>
          </Alert>
          <Button variant="dark" size="sm" onClick={handleOnReset}>
            Load another
          </Button>
        </>
      )}
    </>
  );
};

export default Data;
