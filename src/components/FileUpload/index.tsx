import { FC, useCallback, useContext } from 'react';

import { useDropzone } from 'react-dropzone';
import cx from 'classnames';

import styles from './styles.module.scss';
import { AppContext } from 'components/context';
import { ActionType } from 'components/constants';

const FileUpload: FC = () => {
  const { dispatch } = useContext(AppContext);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        throw new Error('Unable to read file contents');
      };
      reader.onerror = () => {
        throw new Error('Unable to read file contents');
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        const content = reader.result;
        if (typeof content !== 'string') {
          throw new Error('Unable to read file contents');
        }
        dispatch([ActionType.setFileContent, content.split(/\r\n|\r|\n/)]);
      };
      reader.readAsBinaryString(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps({ multiple: false })} />
      <div className={cx(styles.hint, { [styles.active]: isDragActive })}>
        {isDragActive ? (
          <>Drop the files here ...</>
        ) : (
          <>Drag and drop some files here, or click to select files</>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
