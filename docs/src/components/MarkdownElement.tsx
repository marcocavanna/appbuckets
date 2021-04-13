import * as React from 'react';
import clsx from 'clsx';


/* --------
 * Component Interfaces
 * -------- */
export interface StrictMarkdownElementProps {
  /** The rendered markdown content */
  renderedMarkdown?: string;
}

export type MarkdownElementProps = StrictMarkdownElementProps & JSX.IntrinsicElements['div'];


/* --------
 * Component Definition
 * -------- */
const MarkdownElement = React.forwardRef<HTMLDivElement, MarkdownElementProps>((
  props,
  ref
) => {

  const {
    className,
    renderedMarkdown,
    ...rest
  } = props;

  const other: JSX.IntrinsicElements['div'] = {};

  if (typeof renderedMarkdown === 'string') {
    other.dangerouslySetInnerHTML = { __html: renderedMarkdown };
  }

  const classes = clsx('markdown-element', className);

  return (
    <div
      className={classes}
      {...other}
      {...rest}
      ref={ref}
    />
  );
});

MarkdownElement.displayName = 'MarkdownElement';

export default MarkdownElement;
