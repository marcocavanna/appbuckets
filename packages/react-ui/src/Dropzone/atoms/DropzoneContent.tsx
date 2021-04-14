import * as React from 'react';

import { childrenUtils } from '@appbuckets/react-ui-core';


/* --------
 * Component Interfaces
 * -------- */
export interface DropzoneContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Children Shorthand */
  content?: React.ReactNode;
}


/* --------
 * Component Definition
 * -------- */
const DropzoneContent: React.FunctionComponent<DropzoneContentProps> = (props) => {
  const {
    children,
    content,
    ...rest
  } = props;

  return (
    <div {...rest} className={'dropzone-content'}>
      {childrenUtils.isNil(children) ? content : children}
    </div>
  );
};

DropzoneContent.displayName = 'DropzoneContent';

export default DropzoneContent;
