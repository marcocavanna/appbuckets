import * as React from 'react';
import { Accordions } from '@appbuckets/react-ui';


export default { title: 'Collections/Accordions' };

export const accordions = () => (
  <Accordions
    sections={[
      {
        key    : 0,
        trigger: {
          content: 'Accordion 1',
          icon   : {
            name   : 'check',
            success: true
          }
        },
        content: 'Accordion 1 Content'
      },
      {
        key    : 1,
        trigger: {
          content: 'Accordion 1',
          icon   : {
            name   : 'check',
            success: true
          }
        },
        content: 'Accordion 2 Content'
      },
      {
        key    : 2,
        trigger: {
          content: 'Accordion 1',
          icon   : {
            name  : 'times',
            danger: true
          }
        },
        content: 'Accordion 3 Content'
      }
    ]}
  />
);
