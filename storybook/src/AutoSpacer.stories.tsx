import * as React from 'react';

import { AutoSpacer } from '.';


export default { title: 'HOC/AutoSpacer', component: AutoSpacer };

export const autoSpacer = () => (
  <React.Fragment>
    <AutoSpacer minimumHeight={300} subtractHeight={30} subtractWidth={30}>
      {({ height, width }) => (
        <div className={'has-background-primary'} style={{ width, height }}>
          <h3 className={'has-text-white has-text-center'}>
            Container is {height}px height and {width}px width
          </h3>
        </div>
      )}
    </AutoSpacer>
  </React.Fragment>
);
