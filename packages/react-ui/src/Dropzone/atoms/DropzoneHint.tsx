import * as React from 'react';

import EmptyContent from '../../EmptyContent';
import type { EmptyContentProps } from '../../EmptyContent';
import { IconProps } from '../../Icon';
import { AppBucketsIcon } from '../../generic';

import { useDropzone } from '../Dropzone.context';


/* --------
 * Component Interfaces
 * -------- */
export interface DropzoneHintProps extends EmptyContentProps {

}


/* --------
 * Component Definition
 * -------- */
const DropzoneHint: React.FunctionComponent<DropzoneHintProps> = (props) => {
  /** Get the Context */
  const dropzone = useDropzone();

  if (dropzone.files.length) {
    return null;
  }

  // @ts-ignore
  const icon: AppBucketsIcon<IconProps> | undefined = dropzone.state.isDragActive
    ? dropzone.props.iconOnDragging
    : dropzone.props.iconOnIdle;

  return (
    <EmptyContent
      {...props}
      className={'dropzone-hint'}
      icon={icon}
      header={dropzone.props.hintTitle}
      content={dropzone.isDisabled
        ? dropzone.props.hintWhileDisabled
        : dropzone.state.isDragActive
          ? dropzone.props.hintWhileDragging
          : dropzone.props.hintOnIdle}
    />
  );
};

DropzoneHint.displayName = 'DropzoneHint';

export default DropzoneHint;
