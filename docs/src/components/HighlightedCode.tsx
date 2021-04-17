import clsx from 'clsx';
import * as React from 'react';

import NoSsr from '@appbuckets/react-ui/NoSsr';

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

  const classes = clsx(`language-${language}`);

  return (
    <NoSsr>
      <MarkdownElement>
        <pre>
          <code
            className={classes}
            dangerouslySetInnerHTML={{ __html: renderedCode }}
          />
        </pre>
      </MarkdownElement>
    </NoSsr>
  );
};

HighlightedCode.displayName = 'HighlightedCode';

export default HighlightedCode;
