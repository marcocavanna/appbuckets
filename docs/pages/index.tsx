import * as React from 'react';

import { GetStaticProps } from 'next';

import Box from '@appbuckets/react-ui/Box';
import Button from '@appbuckets/react-ui/Button';
import Container from '@appbuckets/react-ui/Container';
import Divider from '@appbuckets/react-ui/Divider';
import Header from '@appbuckets/react-ui/Header';
import Panel from '@appbuckets/react-ui/Panel';

import AppFrame from '../src/components/AppFrame';
import HighlightedCode from '../src/components/HighlightedCode';
import { Text } from '../src/components/Text';

import AppLogo from '../src/components/Navbar/atoms/AppLogo';


export default function Home(props: { version: string }) {
  return (
    <AppFrame description={'Just another React UI Framework'}>
      <Container className={'pt-8'}>

        <div>
          <Box className={'main-logo'} textAlign={'center'}>
            <AppLogo />
          </Box>

          <Header
            textAlign={'center'}
            content={'ReactBucket'}
            subheader={'Just another React UI Framework'}
          />

          <Box textAlign={'center'}>
            <Text>
              Current Documented version is <b>{props.version}</b>
            </Text>
            <div className={'mt-4'}>
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
                href={'/components/accordions'}
                icon={'book-open'}
                content={'Explore Components'}
              />
            </div>
          </Box>
        </div>

        <Divider size={'large'} content={'First Steps'} className={'mb-6 mt-7'} />

        <Panel
          solid
          className={'doc'}
          header={{
            icon   : {
              name   : 'download',
              primary: true
            },
            content: 'Installation'
          }}
          content={(
            <React.Fragment>
              <Text>
                You could install ReactBucket framework using NPM or Yarn
              </Text>
              <HighlightedCode
                language={'bash'}
                code={`# Using YARN
yarn add @appbuckets/react-ui

# Using NPM
npm install --save-dev @appbuckets/react-ui`}
              />
              <Text>
                Every other dependencies like font, icons and style are included in this package.
              </Text>
            </React.Fragment>
          )}
        />
        <Panel
          solid
          className={'doc'}
          header={{
            icon   : {
              name   : 'wrench',
              primary: true
            },
            content: 'Usage'
          }}
          content={(
            <React.Fragment>
              <Text>
                To start using ReactBucket UI Framework you only need to import{' '}
                the starting CSS file from installed package and you are ready to go!
              </Text>
              <HighlightedCode
                language={'tsx'}
                code={`import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the base CSS file
// using SCSS could be done to, check documentation below
import '@appbuckets/react-ui/styles/index.css';

// BucketTheme is the Theme Provider, use this to change the
// default prop of each single component.
// This Provider is not required, and it's optional
import BucketTheme from '@appbuckets/react-ui/BucketTheme';
import Box from '@appbuckets/react-ui/Box';
import Button from '@appbuckets/react-ui/Button';

// Obviously, you could import all components in one statement,
// keeping in mind that the following statements would include
// all source files into your build.
// This could slow down your first page load
// import { BucketTheme, Button, Box } from '@appbuckets/react-ui';


function App() {
  return (
    <Box textAlign='center' mt={8}>
      <Button
        primary
        icon={'rocket'}
        content={'Launch to the Moon'}
        tooltip={'Write wonderful Code'}
      />
    </Box>
  );
}

ReactDOM.render(
  <BucketTheme>
    <App />
  </BucketTheme>,
  document.getElementById('root')
);`}
              />
            </React.Fragment>
          )}
        />

      </Container>
    </AppFrame>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  /** Get the Package JSON to set the Documented Version */
  const pkg = await import('../package.json');

  /** Parse into object */
  const parsed = JSON.parse((pkg as any).default);

  /** Return version */
  return {
    props: { version: parsed?.dependencies?.['@appbuckets/react-ui'] || 'Error' }
  };
};
