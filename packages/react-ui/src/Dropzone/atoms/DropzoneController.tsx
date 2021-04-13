import * as React from 'react';

import Button from '../../Button';
import Column from '../../Column';
import Divider from '../../Divider';
import Row from '../../Row';

import { useDropzone } from '../Dropzone.context';


/* --------
 * Component Interfaces
 * -------- */
export interface DropzoneControllerProps {

}


/* --------
 * Component Definition
 * -------- */
const DropzoneController: React.FunctionComponent<DropzoneControllerProps> = () => {

  const dropzone = useDropzone();

  if (!dropzone.files.length) {
    return null;
  }

  const hasFilesToUpload = dropzone.files.some((file) => !file.state.success);

  return (
    <React.Fragment>
      <Divider />
      <Row>
        <Column textAlign={'right'}>
          {Button.create(dropzone.props.clearButton, {
            autoGenerateKey: false,
            overrideProps  : {
              disabled: dropzone.isDisabled,
              onClick : dropzone.clearFiles
            }
          })}
          {Button.create(dropzone.props.uploadButton, {
            autoGenerateKey: false,
            defaultProps   : {
              primary: true
            },
            overrideProps  : {
              loading : dropzone.isUploading,
              disabled: dropzone.isDisabled || !hasFilesToUpload,
              onClick : dropzone.startUpload
            }
          })}
        </Column>
      </Row>
    </React.Fragment>
  );
};

DropzoneController.displayName = 'DropzoneController';

export default DropzoneController;
