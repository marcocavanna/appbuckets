import * as React from 'react';

import Message from '../../Message';


/* --------
 * Component Interfaces
 * -------- */
export interface RxTableErrorProps {

}


/* --------
 * Component Definition
 * -------- */
const RxTableError: React.FunctionComponent<RxTableErrorProps> = () => (
  <Message
    danger
    header={'An error occurred while loading data'}
  />
);

RxTableError.displayName = 'RxTableError';

export default RxTableError;
