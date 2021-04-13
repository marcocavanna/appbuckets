import { Section } from '@appbuckets/react-ui';
import clsx from 'clsx';
import * as React from 'react';
import { throttle } from 'throttle-debounce';

import { useRouter } from 'next/router';

import { TOCElement } from '../utils/parseMarkdown';


/* --------
 * Utils
 * -------- */
type TOCElementWithNode = TOCElement & { node: HTMLElement | null };

function getItemsClient(items: TOCElement[]): TOCElementWithNode[] {

  const itemsWithNode: TOCElementWithNode[] = [];

  items.forEach((item) => {
    itemsWithNode.push({
      ...item,
      node: document.getElementById(item.hash)
    });

    if (item.children.length) {
      itemsWithNode.push(...getItemsClient(item.children));
    }
  });

  return itemsWithNode;
}

const noop = () => {
};

function useThrottleOnScroll(callback: EventListener | null, delay: number) {

  const throttledCallback = React.useMemo(
    () => (callback ? throttle(delay, callback) : noop),
    [ callback, delay ]
  );

  React.useEffect(
    () => {
      if (throttledCallback === noop) {
        return undefined;
      }

      window.addEventListener('scroll', throttledCallback);

      return () => {
        window.removeEventListener('scroll', throttledCallback);
        (throttledCallback as throttle<EventListener>).cancel();
      };
    },
    [ throttledCallback ]
  );
}


/* --------
 * Component Interfaces
 * -------- */
export interface TableOfContentProps {
  /** Items to render */
  items: TOCElement[]
}


/* --------
 * Component Definition
 * -------- */
const TableOfContent: React.FunctionComponent<TableOfContentProps> = (props) => {

  const { pathname } = useRouter();

  const { items } = props;

  const itemsWithNodeRef = React.useRef<TOCElementWithNode[]>([]);
  React.useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [ items ]);

  const [ activeState, setActiveState ] = React.useState<string | null>(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef<NodeJS.Timeout | null>(null);
  const findActiveIndex = React.useCallback(
    () => {
      /** Abort if an element has been clicked */
      if (clickedRef.current) {
        return;
      }

      let active: TOCElement | undefined;

      for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
        /** Set no hash if page is top scrolled */
        if (document.documentElement.scrollTop < 200) {
          break;
        }

        /** Get the item */
        const item = itemsWithNodeRef.current[i];

        /** Assert node exists */
        if (process.env.NODE_ENV !== 'production') {
          if (!item.node) {
            global.console.error(`Missing node on the item ${JSON.stringify(item, null, 2)}`);
          }
        }

        if (item.node && item.node.offsetTop < document.documentElement.scrollTop + document.documentElement.clientHeight / 4) {
          active = item;
          break;
        }
      }

      if (active && activeState !== active.hash) {
        setActiveState(active.hash);
      }
    },
    [ activeState ]
  );

  useThrottleOnScroll(items.length > 0 ? findActiveIndex : null, 166);

  const handleClick = React.useCallback(
    (hash: string) => (event: React.MouseEvent) => {
      /** Ignore click for new tab/new window */
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }

      /** Programmatically disable findActiveIndex if the page scrolls due to a click */
      clickedRef.current = true;
      unsetClickedRef.current = setTimeout(() => {
        clickedRef.current = false;
      }, 1000);

      /** Set the new active state */
      if (activeState !== hash) {
        setActiveState(hash);
      }
    },
    [ activeState ]
  );

  /** Clear the timeout on page leave */
  React.useEffect(
    () => () => {
      if (unsetClickedRef.current) {
        clearTimeout(unsetClickedRef.current);
      }
    },
    []
  );

  /** Draw the link */
  const itemLink = (item: TOCElement, secondary?: boolean) => (
    <a
      href={`${pathname}#${item.hash}`}
      onClick={handleClick(item.hash)}
      className={clsx(
        'toc-link',
        {
          active: activeState === item.hash,
          secondary
        }
      )}
    >
      {/* eslint-disable-next-line react/no-danger */}
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </a>
  );

  /** Return the TOC Component */
  return (
    <nav className={'toc'}>
      {!!items.length && (
        <Section
          label={'Table of Contents'}
          content={(
            <ul>
              {items.map((item) => (
                <li key={item.hash}>
                  {itemLink(item)}
                  {!!item.children.length && (
                    <ul>
                      {item.children.map((subItem) => (
                        <li key={subItem.hash}>{itemLink(subItem, true)}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        />
      )}
    </nav>
  );
};

TableOfContent.displayName = 'TableOfContent';

export default TableOfContent;
