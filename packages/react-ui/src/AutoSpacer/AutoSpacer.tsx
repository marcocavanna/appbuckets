import * as React from 'react';
import clsx from 'clsx';

import { withDefaultProps } from '../BucketTheme';

import { AutoSpacerProps, AutoSpacerRenderProps } from './AutoSpacer.types';


interface AutoSpacerState {
  /** Current Height */
  height: number;

  /** Current Width */
  width: number;
}

class AutoSpacer extends React.Component<AutoSpacerProps, AutoSpacerState> {


  /* --------
   * Define initial State
   * -------- */
  state: AutoSpacerState = {
    height: this.computeHeight(this.props.defaultHeight ?? 0),
    width : this.computeWidth(this.props.defaultWidth ?? 0)
  };


  /* --------
   * Define the isMounted state to avoid unnecessary re render
   * -------- */
  isComponentMounted = false;


  /* --------
   * Initialize Ref Containers
   * -------- */
  containerRef = React.createRef<HTMLDivElement>();

  parentNode: Node & ParentNode | undefined | null = undefined;


  /* --------
   * Component LifeCycle Handlers
   * -------- */
  public componentDidMount() {
    this.isComponentMounted = true;
    this.parentNode = this.containerRef.current?.parentNode;
    window.addEventListener('resize', this.recomputeSizing.bind(this));
    this.recomputeSizing();
  }


  public componentWillUnmount() {
    this.isComponentMounted = false;
    this.parentNode = undefined;
    window.removeEventListener('resize', this.recomputeSizing.bind(this));
  }


  /* --------
   * Get valid data
   * -------- */
  computeHeight(initialHeight: number): number {
    const {
      subtractHeight = 0,
      maximumHeight,
      minimumHeight = 0
    } = this.props;

    const subtractedHeight = initialHeight - subtractHeight;

    if (subtractedHeight < minimumHeight) {
      return minimumHeight;
    }

    if (typeof maximumHeight === 'number' && subtractedHeight > maximumHeight) {
      return maximumHeight;
    }

    return subtractedHeight;
  }


  computeWidth(initialWidth: number): number {
    const {
      subtractWidth = 0,
      maximumWidth,
      minimumWidth = 0
    } = this.props;

    const subtractedWidth = initialWidth - subtractWidth;

    if (subtractedWidth < minimumWidth) {
      return minimumWidth;
    }

    if (typeof maximumWidth === 'number' && subtractedWidth > maximumWidth) {
      return maximumWidth;
    }

    return subtractedWidth;
  }


  /* --------
   * Resize Callback Function
   * -------- */
  recomputeSizing() {
    /** Avoid recomputing if no node, or if component is not mounted */
    const { current: container } = this.containerRef;

    if (!container || !this.parentNode) {
      return;
    }

    /** Get props */
    const {
      disableHeight,
      disableWidth,
      onResize
    } = this.props;

    /** Get current state and container ref */
    const {
      height: currHeight,
      width : currWidth
    } = this.state;

    /** Get current window dimension */
    const {
      innerHeight: windowHeight,
      innerWidth : windowWidth
    } = window;

    /** Get Container offset Position */
    const {
      top : containerTopPosition,
      left: containerLeftPosition
    } = container.getBoundingClientRect();

    /** Get new Size */
    const nextHeight = disableHeight ? container.clientHeight : this.computeHeight(windowHeight - containerTopPosition);
    const nextWidth = disableWidth ? container.clientWidth : this.computeWidth(windowWidth - containerLeftPosition);

    /** Check if must update state */
    if (this.isComponentMounted && ((nextHeight !== currHeight) || (nextWidth !== currWidth))) {
      this.setState({
        height: nextHeight,
        width : nextWidth
      }, () => {
        if (typeof onResize === 'function') {
          onResize({ height: nextHeight, width: nextWidth });
        }
      });
    }
  }


  /* --------
   * Component Render
   * -------- */
  public renderChildren(): React.ReactNode | null {
    const {
      children,
      renderIfInvisible
    } = this.props;

    const {
      height,
      width
    } = this.state;

    if ((height === 0 || width === 0) && !renderIfInvisible) {
      return null;
    }

    if (typeof children === 'function') {
      return (children as (size: AutoSpacerRenderProps) => React.ReactNode)({ height, width });
    }

    return children ?? null;
  }


  public render() {
    const {
      className,
      children,
      disableHeight,
      disableWidth,
      style
    } = this.props;

    const {
      height,
      width
    } = this.state;

    const classes = clsx(
      {
        'disabled-height': disableHeight,
        'disabled-width' : disableWidth
      },
      'autospacer',
      className
    );

    const divStyle = typeof children !== 'function'
      ? { ...style, height, width }
      : { ...style };

    return (
      <div ref={this.containerRef} className={classes} style={divStyle}>
        {this.renderChildren()}
      </div>
    );
  }
}

const AutoSpacerWrapped: React.FunctionComponent<AutoSpacerProps> = withDefaultProps('autoSpacer', AutoSpacer);

AutoSpacerWrapped.displayName = 'AutoSpacer';

export default AutoSpacerWrapped;
