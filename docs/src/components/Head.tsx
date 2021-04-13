import * as React from 'react';

import NextHead from 'next/head';


/* --------
 * Head Props
 * -------- */
interface HeadProps {
  /** Page Description */
  description?: string;

  /** Page Section */
  section?: string;

  /** Page Title */
  title?: string;
}


/* --------
 * Component Declaration
 * -------- */
const Head: React.FunctionComponent<HeadProps> = (props) => {

  const {
    children,
    description = 'Just another React UI Framework',
    section,
    title = 'ReactBucket'
  } = props;

  return (
    <NextHead>
      {/* Meta ViewPort */}
      <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />

      {/* Page Data */}
      <title>{[ section, title ].filter(v => !!v).join(' | ')}</title>
      <meta name={'description'} content={description} />

      {children}
    </NextHead>
  );

};

export default Head;
