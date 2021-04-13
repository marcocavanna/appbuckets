import * as React from 'react';
import clsx from 'clsx';

import ReactDropzone, {
  DropzoneState as ReactDropzoneState,
  FileRejection
} from 'react-dropzone';

import { withDefaultProps } from '../BucketTheme';

import processFileUpload from './lib/processFileUpload';
import readFile from './lib/readFile';

import {
  DropzoneContext,
  DropzoneProvider
} from './Dropzone.context';

import {
  DropzoneFile,
  DropzoneFileState,
  DropzoneProps
} from './Dropzone.types';

import DropzoneController from './atoms/DropzoneController';
import DropzoneHint from './atoms/DropzoneHint';
import DropzoneFiles from './atoms/DropzoneFiles';
import DropzoneInput from './atoms/DropzoneInput';


/* --------
 * Dropzone State
 * -------- */
interface DropzoneState {
  /** Dropzone files list */
  files: DropzoneFile[];

  /** Dropzone upload has error */
  hasUploadError: boolean;

  /** Dropzone is currently uploading files */
  isUploading: boolean;
}


/* --------
 * Component Declare
 * -------- */
type DropzoneComponent = React.FunctionComponent<DropzoneProps> & {
  processFileUpload: typeof processFileUpload
};


/* --------
 * Component Render
 * -------- */
class Dropzone extends React.Component<DropzoneProps, DropzoneState> {

  // ----
  // Set the Display Name
  // ----
  static displayName: string = 'Dropzone';


  // ----
  // Set initial state
  // ----
  state: DropzoneState = {
    files         : this.props.defaultFiles ?? [],
    hasUploadError: false,
    isUploading   : false
  };


  // ----
  // Component Handlers
  // ----
  private handleDropFiles = async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    /** Get actual State */
    const { isUploading } = this.state;

    /** Abort drop and add files while uploading */
    if (isUploading) {
      return;
    }

    /** Get useful props */
    const {
      onFilesReadError,
      onChange
    } = this.props;

    /** As each file must be read async, build a read promises container */
    const readingPromises: Promise<DropzoneFile>[] = [];

    /** Loop each accepted files and get the DropzoneFile */
    acceptedFiles.forEach((file) => readingPromises.push(readFile(file)));

    /** Await all file read */
    let readFiles: DropzoneFile[] = [];

    try {
      readFiles = await Promise.all(readingPromises);
    }
    catch (error) {
      if (onFilesReadError) {
        onFilesReadError(error);
      }
    }

    /** Set new Files */
    this.setState({
      files: readFiles
    }, () => {
      /** Call the onChange handler if exists */
      if (onChange) {
        onChange(this.state.files, rejectedFiles);
      }
    });
  };


  private handleRemoveFiles = (filesToRemove: DropzoneFile[]) => {
    /** Get useful props */
    const { onChange } = this.props;

    /** Remap files to keep id only */
    const idsToRemove = filesToRemove.map(({ id }) => id);

    /** Set new files */
    this.setState((curr) => ({
      files: curr.files.filter((file) => !idsToRemove.includes(file.id))
    }), () => {
      /** Call the onChange handler if exists */
      if (onChange) {
        onChange(this.state.files, []);
      }
    });
  };


  private handleClearFiles = (e?: React.MouseEvent) => {
    /** Stop Propagation of Click Event */
    if (e) {
      e.stopPropagation();
    }

    /** Get actual State */
    const { isUploading } = this.state;

    /** Abort drop and add files while uploading */
    if (isUploading) {
      return;
    }

    /** Remove all files */
    this.handleRemoveFiles(this.state.files);
  };


  private handleDeleteFile = (file: DropzoneFile) => {
    /** Get actual State */
    const { isUploading } = this.state;

    /** Abort drop and add files while uploading */
    if (isUploading) {
      return;
    }

    /** Remove single file using internal handler */
    this.handleRemoveFiles([ file ]);
  };


  private handleEditFile = (editedFile: DropzoneFile) => {
    /** Get actual State */
    const { isUploading } = this.state;

    /** Abort drop and add files while uploading */
    if (isUploading) {
      return;
    }

    /** Get useful props */
    const { onChange } = this.props;

    /** Set the new state */
    this.setState((curr) => ({
      files: curr.files.map((file) => {
        return file.id === editedFile.id ? editedFile : file;
      })
    }), () => {
      /** Call the onChange handler if exists */
      if (onChange) {
        onChange(this.state.files, []);
      }
    });
  };


  private handleSetFilesState = (filesToChange: DropzoneFile[], state: Partial<DropzoneFileState>) => {
    /** Transform the array into a map object */
    const filesState = filesToChange.reduce<Record<string, Partial<DropzoneFileState>>>((states, file) => {
      states[file.id] = state;
      return states;
    }, {});

    /** Get useful props */
    const { onChange } = this.props;

    /** Set the new state */
    this.setState((curr) => ({
      files: curr.files.map((file) => {
        /** Check if new state exists */
        if (filesState[file.id]) {
          file.state = {
            ...file.state,
            ...filesState[file.id]
          };
        }

        return file;
      })
    }), () => {
      /** Call the onChange handler if exists */
      if (onChange) {
        onChange(this.state.files, []);
      }
    });
  };


  private handleUploadFiles = async (e?: React.MouseEvent) => {
    /** If event exists, invoke come from a button, then must stop propagation */
    if (e) {
      e.stopPropagation();
    }

    /** Get actual State */
    const { isUploading, files } = this.state;

    /** Abort drop and add files while uploading */
    if (isUploading) {
      return;
    }

    /** Get Props */
    const {
      onUploadEnd,
      onUpload,
      onUploadError
    } = this.props;

    /** If no upload function exists, return */
    if (!onUpload) {
      return;
    }

    /** Set the uploading state */
    this.setState({
      isUploading   : true,
      hasUploadError: false
    });

    /** Get the files to upload */
    const filesToUpload = files.filter((file) => !file.state.success);

    let hasError: boolean = false;

    try {
      await onUpload(filesToUpload, {
        removeFiles  : this.handleRemoveFiles,
        setFilesState: this.handleSetFilesState
      });
    }
    catch (error) {
      hasError = true;

      if (onUploadError) {
        onUploadError(error);
      }
    }

    /** Set the state */
    this.setState({
      isUploading   : false,
      hasUploadError: hasError
    }, () => {
      /** Call the onUploadEnd if exists */
      if (onUploadEnd) {
        onUploadEnd(files.filter(file => file.state.success));
      }
    });
  };


  // ----
  // Internal Dropzone Render Function
  // ----
  private renderDropzone = (state: ReactDropzoneState) => {
    /** Get actual state */
    const { files, isUploading, hasUploadError } = this.state;

    /** Get dropzone props */
    const {
      className,
      disabled,
      multiple,
      on,
      showPreview,
      style
    } = this.props;

    /** Build classes */
    const classes = clsx(
      {
        multiple,
        disabled,
        clickable: on?.includes('click') && !disabled && !files.length,
        draggable: on?.includes('drop') && !disabled && !files.length,
        uploading: isUploading,
        dragging : state.isDragActive,
        accepted : state.isDragAccept,
        rejected : state.isDragReject,
        focused  : state.isFocused
      },
      'dropzone',
      {
        'with-files'        : !!files.length,
        'with-preview'      : showPreview,
        'with-active-dialog': state.isFileDialogActive
      },
      className
    );

    /** Build Context */
    const dropzoneContext: DropzoneContext = {
      clearFiles : this.handleClearFiles,
      deleteFile : this.handleDeleteFile,
      editFile   : this.handleEditFile,
      files,
      isDisabled : disabled || isUploading,
      isUploading,
      hasUploadError,
      props      : this.props,
      state,
      startUpload: this.handleUploadFiles
    };

    /** Return the inner component */
    return (
      <DropzoneProvider value={dropzoneContext}>
        <div {...(files.length ? {} : state.getRootProps())} className={classes} style={style}>
          <DropzoneInput />
          <DropzoneHint />
          <DropzoneFiles />
          <DropzoneController />
        </div>
      </DropzoneProvider>
    );
  };


  // ----
  // Main Component Render Function
  // ----
  public render() {
    /** Get configuration props */
    const {
      accept,
      disabled,
      maxFiles,
      maxSize,
      minSize,
      multiple,
      on
    } = this.props;

    /** Get current state */
    const { isUploading } = this.state;

    return (
      <ReactDropzone
        accept={accept}
        disabled={disabled || isUploading}
        maxFiles={multiple ? maxFiles : 1}
        maxSize={maxSize}
        minSize={minSize}
        noClick={!on?.includes('click')}
        noDrag={!on?.includes('drop')}
        onDrop={this.handleDropFiles}
      >
        {this.renderDropzone}
      </ReactDropzone>
    );
  }

}

const DropzoneWrapped: DropzoneComponent = withDefaultProps('dropzone', Dropzone) as DropzoneComponent;

DropzoneWrapped.processFileUpload = processFileUpload;

export default DropzoneWrapped;
