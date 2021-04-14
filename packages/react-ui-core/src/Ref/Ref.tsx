import * as React from 'react';
import * as ReactIs from 'react-is';

import RefFindNode from './RefFindNode';
import RefForward from './RefForward';


export interface RefProps {
  children: React.ReactNode;

  innerRef?: React.Ref<HTMLElement | undefined>;
}


export default function Ref(props: RefProps) {

  const {
    children,
    innerRef,
    ...rest
  } = props;

  const child = React.Children.only(children);

  const ElementType = ReactIs.isForwardRef(child) ? RefForward : RefFindNode;

  const childWithProps = (
    child && rest && Object.keys(rest).length > 0
      ? React.cloneElement(child as React.ReactElement, rest)
      : child
  );

  return (
    <ElementType innerRef={innerRef}>
      {childWithProps}
    </ElementType>
  );

}

Ref.displayName = 'Ref';
