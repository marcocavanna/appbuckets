import * as React from 'react';

import { handleRef } from '../utils/refUtils';

import { RefProps } from './Ref';


export default class RefForward extends React.Component<RefProps, never> {

  static displayName = 'RefForward';

  handleRefOverride = (node: HTMLElement) => {
    const {
      children,
      innerRef
    } = this.props;

    handleRef(
      (children as React.ReactElement & { ref: React.Ref<any> }).ref,
      node
    );

    handleRef(innerRef, node);
  };


  public render() {
    const { children } = this.props;

    return React.cloneElement(children as React.ReactElement, {
      ref: this.handleRefOverride
    });
  }

}
