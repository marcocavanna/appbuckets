import * as React from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Typography from './Typography';


export default {
  title    : 'Components/Typography',
  component: Typography
} as ComponentMeta<typeof Typography>;


const Template: ComponentStory<typeof Typography> = (props) => <Typography {...props} />;

export const Default = Template.bind({});

Default.args = {
  content: 'Prova'
};


export const WithRef: ComponentStory<typeof Typography> = (props) => {

  const ref = React.useRef(null);

  setTimeout(() => console.log(ref), 2000);

  return (
    <Typography ref={ref}>
      Ciao
    </Typography>
  );

};
