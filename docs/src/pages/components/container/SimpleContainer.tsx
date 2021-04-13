import * as React from 'react';

import { Container } from '@appbuckets/react-ui';


export default function SimpleContainer() {
  return (
    <Container fluid>
      <div className={'content'} />
    </Container>
  );
}
