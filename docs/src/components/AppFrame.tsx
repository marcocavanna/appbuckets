import * as React from 'react';
import clsx from 'clsx';

import Container from '@appbuckets/react-ui/Container';
import { TOCElement } from '../utils/parseMarkdown';

import Head from './Head';
import Navbar from './Navbar';

import { HeroProvider } from './Hero';
import Sidebar from './Sidebar';
import TableOfContent from './TableOfContent';

/* --------
 * Component Interfaces
 * -------- */
export interface AppFrameProps {
  /** User defined className */
  className?: string;

  /** Page Description */
  description?: string;

  /** Current page has Sidebar on the left */
  hasSidebar?: boolean;

  /** Hide the Navbar Element */
  hideNavbar?: boolean;

  /** Page Title */
  title?: string;

  /** Current page has TOC on the right */
  toc?: TOCElement[];
}


/* --------
 * Component Definition
 * -------- */
const AppFrame: React.FunctionComponent<AppFrameProps> = (props) => {

  const {
    children,
    className,
    description,
    hasSidebar,
    hideNavbar,
    title,
    toc
  } = props;

  const classes = clsx(
    'docs',
    {
      'with-navbar' : !hideNavbar,
      'with-sidebar': hasSidebar,
      'with-toc'    : !!toc?.length
    },
    className
  );

  return (
    <HeroProvider>
      <div className={classes}>

        <Head section={title} />

        <Navbar title={title} description={description} />

        {hasSidebar && (
          <Sidebar />
        )}

        <div className={'docs-content'}>
          <Container as={'main'}>
            {children}
          </Container>
        </div>

        {toc && (
          <TableOfContent items={toc} />
        )}

      </div>
    </HeroProvider>
  );
};

AppFrame.displayName = 'AppFrame';

export default AppFrame;
