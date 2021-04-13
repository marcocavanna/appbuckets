import * as React from 'react';

import { Panel } from '@appbuckets/react-ui';
import { useHero } from './hero.context';


const Hero = () => {

  /** Get current Hero Context */
  const hero = useHero();

  /** Return Empty if not visible */
  if (!hero.visible) {
    return null;
  }

  return (
    <Panel id={'hero'}>
      <Panel.Header
        actions={hero.actions}
        icon={hero.icon}
        content={hero.content}
        subheader={hero.subheader}
      />
      <Panel.Body
        fab={hero.fabs}
      />
    </Panel>
  );
};

export default Hero;
