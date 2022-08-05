import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  childrenUtils,
  useElementType
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Loader from '../Loader';

import { ItemContentProps } from './ItemContent.types';

import ItemHeader from './ItemHeader';
import ItemMeta from './ItemMeta';
import ItemText from './ItemText';


/* --------
 * Component Declare
 * -------- */
type ItemContentChildren = {
  Header: typeof ItemHeader;
  Meta: typeof ItemMeta;
  Text: typeof ItemText;
};

/* --------
 * Component Render
 * -------- */
const ItemContent: Creatable<React.FunctionComponent<ItemContentProps>> & ItemContentChildren = (
  receivedProps
) => {

  const props = useWithDefaultProps('itemContent', receivedProps);

  const {
    className,
    rest: {
      children,
      content,
      header,
      loading,
      meta,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get the component element type */
  const ElementType = useElementType(ItemContent, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'content',
    className
  );

  const hasChildren = !childrenUtils.isNil(children);


  // ----
  // Define Component Memoized Element
  // ----
  const loaderElement = React.useMemo(
    () => loading && Loader.create(typeof loading !== 'boolean'
      ? loading
      : { type: 'indeterminate bar' }, {
      autoGenerateKey: false,
      defaultProps   : {
        primary: true,
        size   : 'big',
        type   : 'indeterminate bar'
      },
      overrideProps  : {
        active: true
      }
    }),
    [ loading ]
  );

  const headerElement = React.useMemo(
    () => !hasChildren && ItemHeader.create(header, {
      autoGenerateKey: false
    }),
    [ hasChildren, header ]
  );

  const textOrLoaderElement = React.useMemo(
    () => {
      if (hasChildren) {
        return null;
      }

      if (loading) {
        return loaderElement;
      }

      return ItemText.create(content, {
        autoGenerateKey: false
      });
    },
    [ hasChildren, content, loading, loaderElement ]
  );

  const metaElement = React.useMemo(
    () => !hasChildren && !loading && ItemMeta.create(meta, {
      autoGenerateKey: false
    }),
    [ hasChildren, meta, loading ]
  );


  // ----
  // Component render with declared children
  // ----
  if (hasChildren) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }


  // ----
  // Component render with shorthand
  // ----
  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
      {textOrLoaderElement}
      {metaElement}
    </ElementType>
  );
};

ItemContent.displayName = 'ItemContent';

ItemContent.Header = ItemHeader;
ItemContent.Text = ItemText;
ItemContent.Meta = ItemMeta;

ItemContent.create = createShorthandFactory(ItemContent, (content) => ({ content }));

export default ItemContent;
