import * as React from 'react';

import NodeRegistry from './lib/NodeRegistry';
import getNodeRefFromProps from './lib/getNodeRefFromProps';
import handleClassNamesChange from './lib/handleClassNamesChange';


const nodeRegistry = new NodeRegistry();


/* --------
 * Component Props
 * -------- */
export interface MountNodeProps {
  /** Additional ClassName */
  className?: string;

  /** The DOM not where will apply class names, defaults to document.body */
  node?: HTMLElement | React.RefObject<HTMLElement>;
}


/* --------
 * Component Definition
 * -------- */
export default class MountNode extends React.Component<MountNodeProps, never> {


  public componentDidMount() {
    const nodeRef = getNodeRefFromProps(this.props);

    nodeRegistry.add(nodeRef, this);
    nodeRegistry.emit(nodeRef, handleClassNamesChange);
  }


  public shouldComponentUpdate(
    nextProps: Readonly<MountNodeProps>
  ): boolean {
    /** Get next className */
    const {
      className: currentClassName
    } = this.props;

    const {
      className: nextClassName
    } = nextProps;

    return nextClassName !== currentClassName;
  }


  public componentDidUpdate() {
    nodeRegistry.emit(
      getNodeRefFromProps(this.props),
      handleClassNamesChange
    );
  }


  public componentWillUnmount() {
    const nodeRef = getNodeRefFromProps(this.props);

    nodeRegistry.remove(nodeRef, this);
    nodeRegistry.emit(nodeRef, handleClassNamesChange);
  }


  public render() {
    return null;
  }

}
