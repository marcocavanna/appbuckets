import * as React from 'react';
import { useDropzone } from '../Dropzone.context';


/* --------
 * Component Interfaces
 * -------- */
export interface DropzoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}


/* --------
 * Component Definition
 * -------- */
const DropzoneInput: React.FunctionComponent<DropzoneInputProps> = (props) => {
  const dropzone = useDropzone();

  return (
    <div className={'dropzone-input'}>
      <input {...props} {...dropzone.state.getInputProps()} />
    </div>
  );
};

DropzoneInput.displayName = 'DropzoneInput';

export default React.memo(DropzoneInput);
