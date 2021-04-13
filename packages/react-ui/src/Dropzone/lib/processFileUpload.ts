import pLimit from 'p-limit';

import { DropzoneFile, DropzoneHelpers, DropzoneProps } from '../Dropzone.types';


export type ProcessFileHandler = (file: DropzoneFile, helpers: DropzoneHelpers) => Promise<void>;

export interface ProcessFileUploadConfig {
  /** Set if must auto control file state */
  autoControlFileState?: boolean;

  /** Auto remove file timeout */
  autoRemoveUploadedTimeout?: number;

  /** Set concurrency upload */
  concurrency?: number;

  /** Handler to call on single file upload end */
  onFileUploadEnd?: (file: DropzoneFile, helpers: DropzoneHelpers) => void;

  /** On file upload error handler */
  onFileUploadError?: (file: DropzoneFile, helpers: DropzoneHelpers) => void;
}

export default function processFileUpload(
  handler: ProcessFileHandler,
  config?: ProcessFileUploadConfig
): DropzoneProps['onUpload'] {

  const {
    autoControlFileState = true,
    autoRemoveUploadedTimeout = 1000,
    concurrency = 3,
    onFileUploadEnd,
    onFileUploadError
  } = config ?? {};

  return async function uploadFiles(files: DropzoneFile[], helpers: DropzoneHelpers) {

    /** Initialize the Queue */
    const limit = pLimit(concurrency);

    /** Set a promise uploads pool */
    const uploads: Promise<void>[] = [];

    files.forEach((file) => {
      uploads.push(limit(() => new Promise<void>((resolve) => {
        /** Set file uploading */
        if (autoControlFileState) {
          helpers.setFilesState([ file ], {
            isUploading: true,
            error      : false,
            success    : false
          });
        }

        /** Call the handler */
        handler(file, helpers)
          .then(() => {
            /** Set the new file state */
            if (autoControlFileState) {
              helpers.setFilesState([ file ], {
                isUploading: false,
                error      : false,
                success    : true
              });

              if (autoRemoveUploadedTimeout) {
                setTimeout(() => {
                  helpers.removeFiles([ file ]);
                }, autoRemoveUploadedTimeout);
              }
            }

            /** Call the onUploadEnd handler */
            if (onFileUploadEnd) {
              onFileUploadEnd(file, helpers);
            }

            /** Resolve the queue task */
            return resolve();
          })
          .catch(() => {
            /** Set the new file state */
            if (autoControlFileState) {
              helpers.setFilesState([ file ], {
                isUploading: false,
                error      : true,
                success    : false
              });
            }

            /** Call the onUploadError handler */
            if (onFileUploadError) {
              onFileUploadError(file, helpers);
            }

            /** Resolve the task anyway */
            return resolve();
          });

      })));
    });

    /** Await the queue idle */
    await Promise.all(uploads);
  };

}
