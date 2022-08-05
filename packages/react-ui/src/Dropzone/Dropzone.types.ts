import * as React from 'react';

import { Accept, FileRejection } from 'react-dropzone';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { ButtonProps } from '../Button';

import { AppBucketsIcon } from '../generic';

import { IconProps } from '../Icon';


export interface DropzoneProps extends StrictDropzoneProps {
}

export interface StrictDropzoneProps {
  /**
   * Set the accepted files mimeType
   *
   * The value must be an object with a common MIME type as keys
   * and an array of file extensions as values (similar to showOpenFilePicker's types accept option).
   */
  accept?: Accept;

  /** Dropzone children are forbidden */
  children?: never;

  /** User defined classes */
  className?: string;

  /** Clear Button */
  clearButton?: ButtonProps;

  /** The default value */
  defaultFiles?: DropzoneFile[];

  /** Set the dropzone as disabled */
  disabled?: boolean;

  /** Edit Item Tool */
  editItemTool?: ButtonProps;

  /** The dropzone value */
  files?: DropzoneFile[];

  /** Hint to show on idle */
  hintOnIdle?: React.ReactNode;

  /** The hint title text */
  hintTitle?: React.ReactNode;

  /** Hint text to show while disabled */
  hintWhileDisabled?: React.ReactNode;

  /** Hint to show while dragging */
  hintWhileDragging?: React.ReactNode;

  /** Set the hint icon on dragging */
  iconOnDragging?: AppBucketsIcon<IconProps>;

  /** Set the hint icon on idle */
  iconOnIdle?: AppBucketsIcon<IconProps>;

  /** Max Files Accepted, restricted automatically to 1 on multiple={false} */
  maxFiles?: number;

  /** Max File Size to be Accepted */
  maxSize?: number;

  /** Min File Size to be Accepted */
  minSize?: number;

  /** Accept multiple files */
  multiple?: boolean;

  /** Set the event that will accept file */
  on?: ('click' | 'drop')[];

  /** Fired every time file changed */
  onChange?: DropzoneChangeHandler;

  /** On file read error handler */
  onFilesReadError?: (error: Error) => void;

  /** On Files Upload */
  onUpload?: DropzoneUploadHandler;

  /** On Upload Ended handler */
  onUploadEnd?: DropzoneUploadEndHandler;

  /** On Upload Error */
  onUploadError?: (error: any) => void;

  /** Remove item icon */
  removeItemTool?: ButtonProps;

  /** Choose if must show preview on image file */
  showPreview?: boolean;

  /** Custom container style */
  style?: React.CSSProperties;

  /** Upload Button */
  uploadButton?: ButtonProps;

  /** Remove upload controller, rendering the Dropzone as a file container only */
  withoutUploadController?: boolean;
}

export type DropzoneChangeHandler = (files: DropzoneFile[], rejectedFiles: FileRejection[]) => void;

export type DropzoneUploadHandler = (filesToUpload: DropzoneFile[], helpers: DropzoneHelpers) => Promise<void>;

export type DropzoneUploadEndHandler = (uploadedFiles: DropzoneFile[]) => void;

export interface DropzoneHelpers {
  /** Remove file from the list */
  removeFiles: (files: DropzoneFile[]) => void;

  /** Set new files state */
  setFilesState: (files: DropzoneFile[], state: Partial<DropzoneFileState>) => void;
}

export interface DropzoneFileState {
  /** File upload error */
  error: boolean;

  /** Is uploading */
  isUploading: boolean;

  /** File upload success */
  success: boolean;
}

export interface DropzoneFile {
  /** Original Blob File */
  blob: File;

  /** Image file height */
  height: number;

  /** The file icon */
  icon: IconName;

  /** Internal file id */
  id: string;

  /** Check if this file is an image */
  isImage: boolean;

  /** The file name, could be modified by user */
  name: string;

  /** The original file name */
  originalName: string;

  /** Image file preview */
  preview: string | null;

  /** True if there was a file read error */
  readError: boolean;

  /** File size */
  size: number;

  /** Upload state */
  state: DropzoneFileState,

  /** The file type */
  type: string;

  /** Image file width */
  width: number;
}
