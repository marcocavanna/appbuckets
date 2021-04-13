import * as React from 'react';

import { DayPicker } from './index';


export default { title: 'Elements/DayPicker', component: DayPicker };

export const baseDayPicker = () => {

  return (
    <React.Fragment>
      <DayPicker
        clearable
        triggerProps={{
          content: undefined,
          fab    : true,
          primary: true
        }}
        type={'input'}
        todayButton={'Oggi'}
      />
    </React.Fragment>
  );
};
