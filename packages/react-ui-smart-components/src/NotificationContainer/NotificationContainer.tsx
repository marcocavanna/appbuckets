import * as React from 'react';

import ButterToast from 'butter-toast';

import type { NotificationContainerProps } from './NotificationContainer.types';


/* --------
 * Component Render
 * -------- */
const NotificationContainer: React.VFC<NotificationContainerProps> = (props) => (
  <ButterToast {...props} />
);

NotificationContainer.displayName = 'NotificationContainer';

export default NotificationContainer;
