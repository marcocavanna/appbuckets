import * as React from 'react';
import clsx from 'clsx';

import composer from '../composer';

import type { TypographyProps } from './Typography.types';


const Typography = composer<TypographyProps>({

  getElementType: {
    map    : 'variant',
    using  : {
      title    : 'h1',
      subtitle1: 'h2',
      subtitle2: 'h3',
      paragraph: 'p',
      inline   : 'span',
      button   : 'label',
      label    : 'label'
    },
    default: 'p'
  },

  name: 'Typography'

});

export default Typography;
