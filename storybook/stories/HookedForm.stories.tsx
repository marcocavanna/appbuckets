import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import {
  HookedForm,
  HookedFormSubmitHandler,
  HookedDayPicker,
  HookedInput,
  HookedSelect,
  HookedMultiSelect
} from '@appbuckets/react-ui-forms';

import Row from '@appbuckets/react-ui/Row';
import Column from '@appbuckets/react-ui/Column';


export default {
  title    : 'Forms/HookedForm',
  component: HookedForm
} as Meta;


/* --------
 * Component Template
 * -------- */
const HookedFormInner: React.VFC = () => {

  const [ showPassword, setShowPassword ] = React.useState(false);

  const handleToggleShowPassword = React.useCallback(
    () => {
      setShowPassword(!showPassword);
    },
    [ showPassword ]
  );

  return (
    <React.Fragment>

      <Row>
        <Column>
          <HookedInput
            name={'name'}
            label={'Name'}
            validation={{ required: 'At least your name is Required' }}
          />
        </Column>
        <Column>
          <HookedInput name={'surname'} label={'Surname'} />
        </Column>
      </Row>

      <Row>
        <Column>
          <HookedInput
            name={'email'}
            label={'Your Email'}
            icon={'envelope'}
            validation={{ required: 'Your email, please' }}
          />
        </Column>
        <Column>
          <HookedInput
            name={'password'}
            label={'Your Password'}
            icon={'user-secret'}
            type={showPassword ? 'text' : 'password'}
            actions={[
              {
                key    : 0,
                icon   : showPassword ? 'eye' : 'eye-slash',
                tooltip: 'Toggle Password Visibility',
                onClick: handleToggleShowPassword
              }
            ]}
            validation={{ required: 'Set up your password' }}
          />
        </Column>
      </Row>

      <Row>
        <Column>
          <HookedDayPicker name={'birthday'} label={'Your birthday is'} />
        </Column>
        <Column>
          <HookedSelect
            label={'Your favorite Drink is'}
            name={'favoriteDrink'}
            options={[
              { value: 'beer', label: 'Beer' },
              { value: 'wine', label: 'Wine' },
              { value: 'not-water', label: 'Of course not Water' }
            ]}
          />
        </Column>
      </Row>

      <Row>
        <Column>
          <HookedMultiSelect
            closeMenuOnSelect={false}
            label={'I love use'}
            name={'loves'}
            options={[
              'JavaScript',
              'TypeScript',
              'C#',
              'Flutter',
              'Swift'
            ].map((label) => ({ value: label.toLowerCase(), label }))}
          />
        </Column>
      </Row>
    </React.Fragment>
  );

};

export const Overview: Story = () => {

  const defaultValues = {
    birthday     : null,
    name         : null,
    surname      : null,
    email        : null,
    password     : null,
    favoriteDrink: null,
    loves        : null
  };

  const [ values, setValues ] = React.useState(defaultValues);

  const handleSubmit: HookedFormSubmitHandler<any, any, any> = (formValues) => {
    setValues(formValues);
  };

  return (
    <React.Fragment>
      <Row>
        <Column>
          <pre>
            {JSON.stringify(values, null, 2)}
          </pre>
        </Column>
        <Column>
          <HookedForm
            resetOnCancel
            submitButton={'Send'}
            cancelButton={'Reset'}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
          >
            <HookedFormInner />
          </HookedForm>
        </Column>
      </Row>
    </React.Fragment>
  );
};
