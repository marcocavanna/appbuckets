import * as React from 'react';

import Container from '@appbuckets/react-ui/Container';


export default function FixedContainer() {
  return (
    <Container fixedTo={'phone'}>
      <div className={'content'} />
    </Container>
  );
}
