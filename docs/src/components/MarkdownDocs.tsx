import { Header } from '@appbuckets/react-ui';
import * as React from 'react';

import AppFrame from './AppFrame';
import Demo from './Demo';
import MarkdownElement from './MarkdownElement';

import { DemoOptions, PreparedMarkdown, PropsOptions } from '../utils/parseMarkdown';
import PropsTable from './PropsTable';


/* --------
 * Component Interfaces
 * -------- */
export interface MarkdownDocsProps extends PreparedMarkdown {
  /** Require Demo Context */
  requireDemo: __WebpackModuleApi.RequireContext
}


/* --------
 * Component Definition
 * -------- */
const MarkdownDocs: React.FunctionComponent<MarkdownDocsProps> = (props) => {

  const { doc, demos, requireDemo, documentedComponents } = props;

  return (
    <AppFrame
      hasSidebar
      toc={doc.toc}
      className={'markdown-docs'}
      title={doc.title}
      description={doc.description}
    >

      <Header content={doc.title} size={'large'} />

      {doc.rendered.map((section, index) => {
        /** Section rendered as string could be returned */
        if (typeof section === 'string') {
          return <MarkdownElement key={index} renderedMarkdown={section} />;
        }

        /** If no section, return */
        if (!section) {
          return null;
        }

        /** Check if is a demo */
        if ((section as DemoOptions).demo) {
          /** Get the Demo Name */
          const demoName = (section as DemoOptions).demo;
          const demo = demos[demoName];

          if (demo === undefined) {
            const errorMessage = [
              `Missing demo: ${demoName}. You can use one of the following:`,
              Object.keys(demos)
            ].join('\n');

            if (process.env.NODE_ENV !== 'production') {
              global.console.error(errorMessage);
            }

            return (
              <Header
                key={index}
                textAlign={'center'}
                icon={{
                  name   : 'exclamation-circle',
                  warning: true
                }}
                content={`Missing Demo ${demoName}`}
                subheader={`You can use one of the following: ${Object.keys(demos).join(' - ')}`}
              />
            );
          }

          return (
            <Demo
              key={index}
              demo={{
                ...demo,
                js : requireDemo(demo.module).default,
                tsx: demo.moduleTS ? requireDemo(demo.moduleTS).default : undefined
              }}
              demoOptions={section as DemoOptions}
            />
          );
        }

        /** Check if is Props Table */
        if ((section as PropsOptions).props) {
          /** Get the propsName */
          const componentName = (section as PropsOptions).props;
          const componentProps = documentedComponents[componentName];

          if (componentProps === undefined) {
            const errorMessage = [
              `Missing props for: ${componentName}. You can use one of the following:`,
              Object.keys(documentedComponents)
            ].join('\n');

            if (process.env.NODE_ENV !== 'production') {
              global.console.error(errorMessage);
            }

            return (
              <Header
                key={index}
                textAlign={'center'}
                icon={{
                  name   : 'exclamation-circle',
                  warning: true
                }}
                content={`Missing Props for ${componentName}`}
                subheader={`You can use one of the following: ${Object.keys(documentedComponents).join(' - ')}`}
              />
            );
          }

          return (
            <PropsTable
              key={index}
              component={componentProps}
              propsOptions={section as PropsOptions}
            />
          );
        }

        return null;

      })}
    </AppFrame>
  );
};

MarkdownDocs.displayName = 'MarkdownDocs';

export default MarkdownDocs;
