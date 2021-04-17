import * as React from 'react';
import { useRouter } from 'next/router';

import Button from '@appbuckets/react-ui/Button';
import Header from '@appbuckets/react-ui/Header';

import { useHero } from '../Hero';

import NavBarItem from './components/NavbarItem';

import AppLogo from './atoms/AppLogo';


/* --------
 * Navbar Props
 * -------- */
interface NavbarProps {
  /** Page Description */
  description?: string;

  /** Page Title */
  title?: string;
}


const Navbar: React.FunctionComponent<NavbarProps> = (props) => {

  const {
    description,
    title
  } = props;

  const { pathname } = useRouter();

  const hero = useHero();


  // ----
  // Memoized Components
  // ----
  const pageTitleElement = React.useMemo(
    () => Header.create({
      content  : hero.content || title || 'ReactBucket',
      subheader: hero.subheader || description
    }, {
      autoGenerateKey: false
    }),
    [ hero.content, hero.subheader, title, description ]
  );


  const handleScroll = React.useCallback(
    () => {
      const { scrollTop } = document.documentElement;

      if (scrollTop > 0) {
        document.body.classList.add('scrolled');
      }
      else {
        document.body.classList.remove('scrolled');
      }

      if (scrollTop > 120) {
        document.body.classList.add('over-scrolled');
      }
      else {
        document.body.classList.remove('over-scrolled');
      }
    },
    []
  );

  React.useEffect(
    () => {
      /** Add a listener to scroll event */
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    [ handleScroll ]
  );


  // ----
  // Component Render
  // ----
  return (
    <div id={'navbar'}>
      <div className={'navbar-container'}>
        <div className={'navbar-logo'}>
          <AppLogo />
        </div>

        <div className={'navbar-content'}>

          <div className={'navbar-left'}>
            <div className={'navbar-menu'}>
              <NavBarItem>
                <Button
                  primary
                  active={pathname === '/'}
                  href={'/'}
                  content={'First Steps'}
                />
              </NavBarItem>
              <NavBarItem>
                <Button
                  primary
                  active={/^\/components/.test(pathname)}
                  href={'/components/accordions'}
                  content={'Components'}
                />
              </NavBarItem>
              <NavBarItem>
                <Button
                  primary
                  active={/^\/customize-style/.test(pathname)}
                  href={'/customize-style'}
                  content={'Customize Style'}
                />
              </NavBarItem>
            </div>
            {pageTitleElement && (
              <div className={'navbar-page-title'}>
                {pageTitleElement}
              </div>
            )}
          </div>

          <div className={'navbar-right'}>
            <NavBarItem>
              <Button
                primary
                target={'_blank'}
                href={'https://github.com/marcocavanna/react-bucket'}
                tooltip={'View on GitHub'}
                icon={{
                  iconStyle: 'fab',
                  name     : 'github',
                  size     : 'large'
                }}
              />
            </NavBarItem>
          </div>

        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
