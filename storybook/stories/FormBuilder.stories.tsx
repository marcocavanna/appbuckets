import * as React from 'react';
import * as Yup from 'yup';

import { Meta, Story } from '@storybook/react';

import Button from '@appbuckets/react-ui/Button';
import Toast from '@appbuckets/react-ui/Toast';
import type { SelectDefaultOption } from '@appbuckets/react-ui/Select';

import HookedInput from '@appbuckets/react-ui-forms/HookedInput';

import {
  NotificationManager,
  NotificationContainer,
  buildFormAction,
  SmartComponentsProvider,
  useFormBuilt,
  createSelectors
} from '@appbuckets/react-ui-smart-components';


/* --------
 * Internal Props
 * -------- */
interface FormDataDto {
  name: string;

  selectedType: string;

  otherSelection: string;
}


/* --------
 * Story Init
 * -------- */
const notificationManager = new NotificationManager('testing', Toast);

export default {
  title     : 'Builder/Form',
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

const options: SelectDefaultOption[] = [
  { value: '0', label: 'Option 0' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' }
];


/* --------
 * Selector
 * -------- */
const TestSelector = createSelectors<SelectDefaultOption>({

  displayName: 'TestSelector',

  options,

  getOptionValue: o => o.value,
  getOptionLabel: o => o.label

});


/* --------
 * Form Builder
 * -------- */
const TestDialog = buildFormAction<FormDataDto, {}, any>({

  displayName: 'TestForm',

  Content: () => {

    const { useFieldValue } = useFormBuilt<FormDataDto>();

    const [ selectedType ] = useFieldValue('selectedType');

    React.useEffect(
      () => {
        console.log('useFieldValue() changed');
      },
      [ useFieldValue ]
    );

    React.useEffect(
      () => {
        console.log('selectedType changed', selectedType, typeof selectedType);
      },
      [ selectedType ]
    );

    return (
      <React.Fragment>
        <HookedInput name={'name'} label={'Name'} />
        <TestSelector.HookedSingle name={'selectedType'} label={'First Type'} />
        <TestSelector.HookedMulti
          name={'otherSelection'}
          label={'Second Type'}
          filter={o => o.value !== selectedType}
        />
      </React.Fragment>
    );
  },

  schema: Yup.object({
    name          : Yup.string().required(),
    selectedType  : Yup.string().required(),
    otherSelection: Yup.string().required()
  }),

  submitButton: 'Confirm',

  cancelButton: 'Cancel',

  trigger: (
    <Button content={'Open Dialog'} />
  ),

  toast: {
    onCanceled: 'Canceled',
    onError   : 'Error'
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
  <TestDialog />
);


export const Overview = Template.bind({});
