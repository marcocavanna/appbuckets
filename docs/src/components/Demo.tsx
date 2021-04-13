import { Button, Collapsable, Column, Row } from '@appbuckets/react-ui';
import clsx from 'clsx';
import * as React from 'react';

import { Demo as DemoType, DemoOptions } from '../utils/parseMarkdown';
import HighlightedCode from './HighlightedCode';


/* --------
 * Internal Useful Function
 * -------- */
type CurrentDemo = {
  Component: React.ComponentType
  raw: string,
  variant: 'tsx' | 'jsx'
};

function useDemo(variant: CurrentDemo['variant'], demo: CompiledDemo): CurrentDemo {
  if (variant === 'tsx' && demo.rawTS && demo.tsx) {
    return {
      Component: demo.tsx,
      raw      : demo.rawTS,
      variant  : 'tsx'
    };
  }

  return {
    Component: demo.js,
    raw      : demo.raw,
    variant  : 'jsx'
  };
}

function useUniqueId(prefix: string): string {
  const [ id, setId ] = React.useState<string>();

  React.useEffect(
    () => setId(Math.random().toString(36).slice(2)),
    []
  );

  return prefix ? `${prefix}${id}` : (id || '');
}


/* --------
 * Component Interfaces
 * -------- */
type CompiledDemo = DemoType & { js: React.ComponentType, tsx?: React.ComponentType };

export interface DemoProps {
  /** Demo to render */
  demo: CompiledDemo;

  /** Demo options */
  demoOptions: DemoOptions;
}


/* --------
 * Component Definition
 * -------- */
const Demo: React.FunctionComponent<DemoProps> = (props) => {

  const { demo, demoOptions } = props;


  // ----
  // Internal Component State
  // ----

  /** Manage Code Open */
  const [ codeOpen, setCodeOpen ] = React.useState<boolean>(demoOptions.defaultCodeOpen || false);
  const shownOnce = React.useRef<boolean>(false);

  const handleToggleCodeOpen = React.useCallback(
    () => {
      setCodeOpen(!codeOpen);
    },
    [ codeOpen ]
  );

  if (codeOpen) {
    shownOnce.current = true;
  }

  /** Set variants */
  const [ variant, setDemoVariant ] = React.useState<CurrentDemo['variant']>('tsx');

  const handleSetVariant = React.useCallback(
    (newVariant: CurrentDemo['variant']) => () => {
      setDemoVariant(newVariant);
    },
    []
  );

  /** Handle Demo Over */
  const [ , setDemoHovered ] = React.useState<boolean>(false);

  const handleDemoHover = React.useCallback(
    (event: React.MouseEvent) => {
      setDemoHovered(event.type === 'mouseenter');
    },
    []
  );


  // ----
  // Load Demo Data
  // ----
  const currentDemo = useDemo(variant, demo);

  const DemoComponent = currentDemo.Component;


  // ----
  // Build Demo Style
  // ----
  const demoSandboxStyle = React.useMemo(
    (): React.CSSProperties => ({
      height  : demoOptions.height,
      maxWidth: demoOptions.maxWidth
    }),
    [ demoOptions.height, demoOptions.maxWidth ]
  );


  // ----
  // Get Demo IDS
  // ----
  const demoId = useUniqueId('demo-');
  const demoSourceId = useUniqueId('demo-source-');

  return (
    <div className={'demo-root'}>
      <div className={'demo-content'}>
        <div
          id={demoId}
          className={clsx(
            'demo-sandbox-container',
            demoOptions.className,
            demoOptions.iframe && 'framed'
          )}
          onMouseEnter={handleDemoHover}
          onMouseLeave={handleDemoHover}
        >
          <div id={demoSourceId} className={'demo-preview'} style={demoSandboxStyle}>
            <DemoComponent />
          </div>
        </div>
      </div>

      <div className={'demo-toolbar mt-4'}>
        <Row>
          <Column>
            {codeOpen && (
              <Button.Group>
                <Button
                  toggle
                  fitted
                  active={currentDemo.variant === 'tsx'}
                  content={'TS'}
                  onClick={handleSetVariant('tsx')}
                />
                <Button
                  toggle
                  fitted
                  active={currentDemo.variant === 'jsx'}
                  content={'JS'}
                  onClick={handleSetVariant('jsx')}
                />
              </Button.Group>
            )}
          </Column>
          <Column textAlign={'right'}>
            <Button
              flat
              icon={'code'}
              tooltip={codeOpen ? 'Hide Source' : 'View Source'}
              onClick={handleToggleCodeOpen}
            />
          </Column>
        </Row>

        <Collapsable
          open={codeOpen}
          content={(
            <div className={'demo-code'}>
              <HighlightedCode
                code={currentDemo.raw}
                language={currentDemo.variant}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

Demo.displayName = 'Demo';

export default Demo;
