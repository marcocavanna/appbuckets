import * as React from 'react';
import { NextPage } from 'next';

import MarkdownDocs from '../../src/components/MarkdownDocs';

import { PreparedMarkdown, prepareMarkdown } from '../../src/utils/parseMarkdown';


const pageFilename = 'components/panel';
const requireDemo = require.context('../../src/pages/components/panel', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/components/panel',
  true,
  /\.(js|md|tsx|json)$/
);


const Page: NextPage<PreparedMarkdown> = (props) => {
  return (
    <MarkdownDocs
      {...props}
      requireDemo={requireDemo}
    />
  );
};

Page.getInitialProps = () => prepareMarkdown({ pageFilename, requireRaw });

export default Page;
