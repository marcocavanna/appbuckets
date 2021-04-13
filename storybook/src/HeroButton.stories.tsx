import * as React from 'react';

import HeroButton from './HeroButton';


export default { title: 'Elements/HeroButton' };


export const defaultButton = () => (
  <HeroButton
    active
    discreet
    appearance={'dribble'}
    content={'An Hero Button'}
    subheader={'The Hero Button Content Text'}
    icon={'truck-loading'}
  />
);
