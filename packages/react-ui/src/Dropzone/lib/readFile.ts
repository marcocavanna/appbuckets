import { DropzoneFile } from '../Dropzone.types';
import mimeTypeToIcon from './mimeTypeToIcon';


export default function readFile(file: File): Promise<DropzoneFile> {
  return new Promise<DropzoneFile>((resolve) => {
    /** Create the base Dropzone File */
    const dropzoneFile: DropzoneFile = {
      blob        : file,
      height      : 0,
      icon        : mimeTypeToIcon(file.type),
      id          : (Date.now() + (Math.random() * 1000)).toString(36),
      isImage     : /^image\//.test(file.type),
      name        : file.name,
      originalName: file.name,
      preview     : null,
      readError   : false,
      size        : file.size,
      state       : {
        error      : false,
        isUploading: false,
        success    : false
      },
      type        : file.type,
      width       : 0
    };

    /** If file is not an image, return */
    if (!dropzoneFile.isImage) {
      return resolve(dropzoneFile);
    }

    /** Else, read the image */
    const reader = new FileReader();

    /** Init an handler to abort the reader */
    const handleAbortRead = () => {
      dropzoneFile.readError = true;
      return resolve(dropzoneFile);
    };

    /** Attach events to file reader */
    reader.onabort = handleAbortRead;
    reader.onerror = handleAbortRead;

    reader.onload = (event) => {
      /** Set the preview */
      dropzoneFile.preview = event.target?.result?.toString() ?? null;

      /** Read the image to get its dimension */
      if (event.target && typeof event.target.result === 'string') {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          dropzoneFile.height = image.height;
          dropzoneFile.width = image.width;
          return resolve(dropzoneFile);
        };
      }
      else {
        return resolve(dropzoneFile);
      }
    };

    /** Read the file */
    reader.readAsDataURL(file);
  });
}
