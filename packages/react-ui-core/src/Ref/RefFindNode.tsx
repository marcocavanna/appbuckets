import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { handleRef } from '../utils/refUtils';

import { RefProps } from './Ref';


export default class RefFindNode extends React.Component<RefProps, never> {

  static displayName = 'RefFindNode';

  prevNode: Node | null = null;


  public componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    this.prevNode = ReactDOM.findDOMNode(this);

    handleRef(this.props.innerRef, this.prevNode as HTMLElement);
  }


  public componentDidUpdate(prevProps: Readonly<RefProps>) {
    // eslint-disable-next-line react/no-find-dom-node
    const currentNode = ReactDOM.findDOMNode(this);

    if (this.prevNode !== currentNode) {
      this.prevNode = currentNode;
      handleRef(this.props.innerRef, currentNode as HTMLElement);
    }

    if (prevProps.innerRef !== this.props.innerRef) {
      handleRef(this.props.innerRef, currentNode as HTMLElement);
    }
  }


  public componentWillUnmount() {
    handleRef(this.props.innerRef, null);

    this.prevNode = null;
  }


  public render() {
    const { children } = this.props;

    return children;
  }

}
