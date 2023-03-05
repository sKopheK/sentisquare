import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FileUpload from '.';

describe('FileUpload', () => {
  let file: File;

  beforeEach(() => {
    file = new File(
      ['lorem ipsum dolor sit amet, consectetur adipiscing elit'],
      'data.txt',
      {
        type: 'text/plain',
      }
    );
  });

  it('should upload file', async () => {
    const { getByTestId } = render(<FileUpload />);
    const inputFile = getByTestId('file-upload') as HTMLInputElement;
    await act(async () => {
      await waitFor(() => {
        userEvent.upload(inputFile, file);
      });
    });

    expect(inputFile.files?.[0]).toStrictEqual(file);
  });

  // not possible to emulate draging a file over dropzone
  // @see https://github.com/react-dropzone/react-dropzone/discussions/1277
  it.skip('should display hint to drop file', async () => {
    const { getByTestId } = render(<FileUpload />);
    const dropzone = getByTestId('dropzone');
    const input = getByTestId('file-upload');

    const dataTransfer = {
      dataTransfer: {
        files: [file],
        types: ['Files'],
      },
    };

    act(() => {
      fireEvent.dragEnter(dropzone);
      fireEvent.dragOver(dropzone, dataTransfer);
    });

    expect(getByTestId('drag-active')).toBeInTheDocument();

    act(() => {
      fireEvent.dragLeave(dropzone);
      fireEvent.dragEnter(input);
      fireEvent.dragOver(input);
    });
    expect(getByTestId('drag-active')).toBeInTheDocument();
  });
});
