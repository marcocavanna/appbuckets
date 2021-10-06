import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import Button from '@appbuckets/react-ui/Button';
import Toast from '@appbuckets/react-ui/Toast';

import {
  NotificationManager,
  NotificationContainer,
  buildConfirmAction,
  SmartComponentsProvider
} from '@appbuckets/react-ui-smart-components';


const notificationManager = new NotificationManager('testing', Toast);

export default {
  title     : 'Builder/Confirm',
  decorators: [
    (storyFn) => (
      <SmartComponentsProvider notificationManager={notificationManager}>
        {storyFn()}
        <NotificationContainer namespace={'testing'} position={{ horizontal: 'POS_CENTER', vertical: 'POS_BOTTOM' }} />
      </SmartComponentsProvider>
    )
  ]
} as Meta;


function awaitFn(fn: () => void, ms: number) {
  return () => (
    new Promise<void>((resolve) => {
      setTimeout(() => {
        fn();
        return resolve();
      }, ms);
    })
  );
}

/* --------
 * Dialog Builder
 * -------- */
const TestDialog = buildConfirmAction<{ vehicle: string }>({

  displayName: 'TestDialog',

  Content: () => (
    <div>
      <h1>Test!</h1>
    </div>
  ),

  submitButton: 'Delete',

  cancelButton: 'Cancel',

  trigger: (
    <Button content={'Open Dialog'} />
  ),

  toast: {
    onCanceled : 'Canceled',
    onError    : 'Error',
    onSubmitted: 'Submitted'
  },

  defaultProps: {
    modal     : true,
    modalProps: {
      icon  : 'plus',
      header: {
        content  : 'Dialog Header',
        subheader: 'Dialog Subheader'
      }
    }
  },

  onCancel: () => console.log('Canceled Default'),

  onCompleted: () => console.log('Completed Default'),

  onSubmit: awaitFn(() => console.log('Submit Default'), 1500),

  onSubmitError: () => console.log('Submit Error')
});


/* --------
 * Component Template
 * -------- */
const Template: Story = () => (
  <TestDialog
    vehicle={'Pippo'}
    trigger={<Button primary content={'Override'} />}
    onCompleted={awaitFn(() => console.log('Override'), 2500)}
  />
);


export const Overview = Template.bind({});
