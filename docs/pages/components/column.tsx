import * as React from 'react';
import { NextPage, GetStaticProps } from 'next';

import MarkdownDocs from '../../src/components/MarkdownDocs';

import { PreparedMarkdown, prepareMarkdown } from '../../src/utils/parseMarkdown';


const pageFilename = 'components/column';
const requireDemo = require.context('../../src/pages/components/column', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/components/column',
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

export const getStaticProps: GetStaticProps<PreparedMarkdown> = async () => ({
  props: prepareMarkdown({ pageFilename, requireRaw })
});

export default Page;
