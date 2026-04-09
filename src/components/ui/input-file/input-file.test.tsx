import { render, screen, fireEvent } from '@testing-library/react';

import InputFile from './input-file';

describe('InputFile', () => {
  it('renders the component with label', () => {
    render(<InputFile label="Upload File" />);
    const labelElement = screen.getByText('Upload File');

    expect(labelElement).toBeInTheDocument();
  });

  it('updates the file name on file selection', async () => {
    const onChangeMock = vi.fn();
    render(<InputFile onChange={onChangeMock} />);
    const inputElement = screen.getByLabelText('Choose file');
    const file = new File(['file contents'], 'test-file.txt', {
      type: 'text/plain',
    });

    await fireEvent.change(inputElement, { target: { files: [file] } });

    const fileNameElement = screen.getByText('test-file.txt');

    expect(fileNameElement).toBeInTheDocument();
  });

  it('calls the onChange callback on file selection', async () => {
    const onChangeMock = vi.fn();
    render(<InputFile onChange={onChangeMock} />);
    const inputElement = screen.getByLabelText('Choose file');
    const file = new File(['file contents'], 'test-file.txt', {
      type: 'text/plain',
    });

    await fireEvent.change(inputElement, { target: { files: [file] } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
