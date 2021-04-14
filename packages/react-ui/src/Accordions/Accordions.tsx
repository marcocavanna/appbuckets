import * as React from 'react';
import clsx from 'clsx';

import { useAutoControlledValue, useElementType, ShorthandItem } from '@appbuckets/react-ui-core';

import { useSharedClassName } from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Column from '../Column';
import Collapsable from '../Collapsable';
import Header from '../Header';
import Icon from '../Icon';
import Row from '../Row';

import type { HeaderProps } from '../Header';


import { AccordionsProps } from './Accordions.types';


/* --------
 * Component Render
 * -------- */
const Accordions: React.FunctionComponent<AccordionsProps> = (receivedProps) => {

  const props = useWithDefaultProps('accordions', receivedProps);

  const {
    className,
    rest: {
      activeIndexes: userDefinedActiveIndexes,
      allowMultiple,
      defaultActiveIndexes: userDefinedDefaultActiveIndexes,
      icon,
      iconRotation,
      onSectionChange,
      onSectionClose,
      onSectionOpen,
      sections,
      ...rest
    }
  } = useSharedClassName(props);

  /** Control the Active Section */
  const [ activeIndexes, trySetActiveIndexes ] = useAutoControlledValue([], {
    prop       : userDefinedActiveIndexes,
    defaultProp: userDefinedDefaultActiveIndexes
  });

  /** Get the component element type */
  const ElementType = useElementType(Accordions, receivedProps, props);

  /** Build the element class list */
  const classes = clsx(
    'accordions',
    className
  );


  // ----
  // Handlers
  // ----
  const handleSectionOpen = (index: number) => {
    /** Build new Indexes */
    const newIndexes: number[] = allowMultiple
      ? [ ...activeIndexes ]
      : [ index ];

    if (allowMultiple && !newIndexes.includes(index)) {
      newIndexes.push(index);
    }

    /** Fire the onOpen Event */
    if (typeof onSectionOpen === 'function') {
      onSectionOpen(null, { ...props, activeIndexes: newIndexes });
    }

    /** Fire the onChange Event */
    if (typeof onSectionChange === 'function') {
      onSectionChange('open', { ...props, activeIndexes: newIndexes });
    }

    /** Try to set new state */
    trySetActiveIndexes(newIndexes);
  };

  const handleSectionClose = (index: number) => {
    /** Build new indexes */
    const newIndexes: number[] = allowMultiple
      ? activeIndexes.filter((val) => val !== index)
      : [];

    /** Fire the onClose Event */
    if (typeof onSectionClose === 'function') {
      onSectionClose(null, { ...props, activeIndexes: newIndexes });
    }

    /** Fire the onChange Event */
    if (typeof onSectionChange === 'function') {
      onSectionChange('close', { ...props, activeIndexes: newIndexes });
    }

    /** Try to set new state */
    trySetActiveIndexes(newIndexes);
  };


  // ----
  // Define SubComponent Render
  // ----
  const renderTrigger = React.useCallback(
    (trigger: ShorthandItem<HeaderProps>, index: number) => {
      const headerElement = Header.create(trigger, { autoGenerateKey: false });
      const iconElement = Icon.create(icon, {
        autoGenerateKey: false,
        overrideProps  : {
          style: iconRotation !== undefined && activeIndexes.includes(index)
            ? { transform: `rotate(${iconRotation}deg)` }
            : undefined
        }
      });

      if (!headerElement && !iconElement) {
        return undefined;
      }

      return (
        <div className={'accordion-trigger'}>
          <Row verticalAlign={'center'}>
            <Column>{headerElement}</Column>
            {iconElement && (
              <Column width={'auto'}>
                {iconElement}
              </Column>
            )}
          </Row>
        </div>
      );
    },
    // @ts-ignore
    [ activeIndexes, icon, iconRotation ]
  );

  const renderSectionsElement = () => {
    /** Assert Sections Array exists */
    if (!Array.isArray(sections)) {
      return null;
    }

    return sections.map((section, index) => (
      Collapsable.create({
        ...section,
        content: (
          <div className={'accordion-content'}>
            {section.content}
          </div>
        ),
        trigger: renderTrigger(section.trigger, index) || undefined
      }, {
        autoGenerateKey: false,
        defaultProps   : {
          open     : activeIndexes.includes(index),
          className: clsx({
            'previous-opened': index !== 0 && activeIndexes.includes(index - 1),
            'next-opened'    : activeIndexes.includes(index + 1)
          })
        },
        overrideProps  : {
          onClose: () => {
            handleSectionClose(index);
          },
          onOpen : () => {
            handleSectionOpen(index);
          }
        }
      })
    ));
  };

  return (
    <ElementType {...rest} className={classes}>
      {renderSectionsElement()}
    </ElementType>
  );
};

Accordions.displayName = 'Accordions';

export default Accordions;
