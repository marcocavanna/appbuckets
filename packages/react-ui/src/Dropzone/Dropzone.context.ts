import * as React from 'react';

import { DropzoneState } from 'react-dropzone';

import { contextBuilder } from '../utils';
import { DropzoneFile, DropzoneProps } from './Dropzone.types';


export interface DropzoneContext {
  /** Clear all files */
  clearFiles: (e?: React.MouseEvent) => void;

  /** Delete a single file */
  deleteFile: (file: DropzoneFile) => void;

  /** Edit a file */
  editFile: (file: DropzoneFile) => void;

  /** Current files array */
  files: DropzoneFile[];

  /** Check if last upload has error */
  hasUploadError: boolean;

  /** Is dropzone Disabled */
  isDisabled: boolean;

  /** Check if dropzone is uploading */
  isUploading: boolean;

  /** All dropzone Props */
  props: DropzoneProps;

  /** The Dropzone State */
  state: DropzoneState;

  /** Start upload process */
  startUpload: (e?: React.MouseEvent) => void;
}


const {
  hook    : useDropzone,
  Provider: DropzoneProvider,
  Consumer: DropzoneConsumer
} = contextBuilder<DropzoneContext>();

export {
  useDropzone,
  DropzoneProvider,
  DropzoneConsumer
};
