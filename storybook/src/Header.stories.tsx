import * as React from 'react';

import { text, boolean } from '@storybook/addon-knobs';

import { Header } from './index';

import { getBackgroundColor, getElementSize, getTextAlign, getTextColor } from '../../stories';


export default { title: 'Elements/Header' };


/* --------
 * Stories
 * -------- */
export const simpleHeader = () => {

  const content = text('Content', 'I am the Header Content');
  const subheader = text('Subheader', 'And i am a Subheader');

  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();
  const textAlign = getTextAlign();
  const size = getElementSize();

  return (
    <Header
      primary
      solid
      inverted
      icon={{ iconStyle: 'fab', name: '500px' }}
      content={content}
      subheader={subheader}
      textColor={textColor}
      textAlign={textAlign}
      backgroundColor={backgroundColor}
      size={size}
      disabled={boolean('Disabled', false)}
      divided={boolean('Divided', false)}
      actions={[
        { key: 0, primary: true, content: 'Add Me', icon: 'thumbs-up' },
        { key: 1, primary: true, content: 'Add Me', icon: 'thumbs-up' }
      ]}
    />
  );

};
