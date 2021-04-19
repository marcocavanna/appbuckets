import * as React from 'react';

import '@appbuckets/react-ui/styles/index.scss';

import Box from '@appbuckets/react-ui/Box';
import Button from '@appbuckets/react-ui/Button';
import Container from '@appbuckets/react-ui/Container';
import Divider from '@appbuckets/react-ui/Divider';
import Header from '@appbuckets/react-ui/Header';

import logo from '../assets/logo.svg';


const App: React.VFC = () => (
  <Container fixedTo={'tablet'} className={'py-8'}>
    <Header
      textAlign={'center'}
      icon={<img src={logo} alt={'AppBuckets ReactUI Logo'} height={128} />}
      content={'Welcome to AppBuckets ReactUI Template'}
      subheader={(
        <Header.Subheader className={'mt-4'}>
          Start editing <code>src/App.tsx</code> and save to reload.
        </Header.Subheader>
      )}
    />

    <Box textAlign={'center'} mt={8}>
      <Button
        href={'https://github.com/marcocavanna/appbuckets'}
        target={'_blank'}
        icon={{
          iconStyle: 'fab',
          name     : 'github'
        }}
        content={'Check it Out on GitHub!'}
      />
      <Button
        primary
        inverted
        href={'https://react-ui.appbuckets.io/components/row'}
        target={'_blank'}
        icon={'book-open'}
        content={'Explore Components'}
      />
      <Divider content={'OR'} className={'my-6'} />
      <Button
        href={'https://reactjs.org'}
        target={'_blank'}
        icon={{ iconStyle: 'fab', name: 'react' }}
        content={'Learn React'}
        rel={'noopener noreferrer'}
      />
    </Box>
  </Container>
);

export default App;
