import clsx from 'clsx';
import * as React from 'react';

import { highlightCode } from '../utils/parseMarkdown';
import MarkdownElement from './MarkdownElement';


/* --------
 * Component Interfaces
 * -------- */
export interface HighlightedCodeProps {
  /** The code to show */
  code: string;

  /** The language to use */
  language: string;
}


/* --------
 * Component Definition
 * -------- */
const HighlightedCode: React.FunctionComponent<HighlightedCodeProps> = (props) => {

  const { code, language } = props;

  const renderedCode = React.useMemo(
    () => highlightCode(code, language),
    [ code, language ]
  );

  const classes = React.useRef<string>('');
  React.useEffect(
    () => {
      classes.current = clsx(`language-${language}`);
    },
    [ language ]
  );

  return (
    <MarkdownElement>
      <pre>
        <code
          className={classes.current}
          dangerouslySetInnerHTML={{ __html: renderedCode }}
        />
      </pre>
    </MarkdownElement>
  );
};

HighlightedCode.displayName = 'HighlightedCode';

export default HighlightedCode;
