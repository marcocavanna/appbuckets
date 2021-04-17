import * as React from 'react';

import { useRouter } from 'next/router';

import Button from '@appbuckets/react-ui/Button';
import Collapsable from '@appbuckets/react-ui/Collapsable';


/* --------
 * Initialize the Menu Object
 * -------- */
const menus: { elements: string[], section: string }[] = [
  {
    section : 'Layout',
    elements: [
      'Row',
      'Column',
      'Box',
      'Container'
    ]
  },
  {
    section : 'Input',
    elements: [
      'Button',
      'Checkbox',
      'ColorPicker',
      'DayPicker',
      'Dropzone',
      'Form',
      'HeroButton',
      'Input',
      'MultiSelect',
      'NumericInput'
    ]
  },
  {
    section : 'Display',
    elements: [
      'Accordions',
      'Avatar',
      'Badge',
      'CircularProgress',
      'Divider',
      'DropdownMenu',
      'EmptyContent',
      'Header',
      'Icon',
      'Item',
      'Label',
      'LinearProgress',
      'Menu',
      'Message',
      'Panel',
      'Section',
      'Tabs',
      'Toast'
    ]
  },
  {
    section : 'Tables',
    elements: [
      'Table',
      'RxTable',
      'VirtualizedTable'
    ]
  },
  {
    section : 'Utilities',
    elements: [
      'AutoSpacer',
      'Backdrop',
      'BucketTheme',
      'Collapsable',
      'Loader',
      'Modal',
      'Popup',
      'Sticky'
    ]
  }
];


/* --------
 * Component Interfaces
 * -------- */
export interface SidebarProps {

}


/* --------
 * Component Definition
 * -------- */
const Sidebar: React.FunctionComponent<SidebarProps> = () => {

  const router = useRouter();

  return (
    <nav className={'sidebar'}>
      <div className={'sidebar-content'}>
        {menus.map((group) => (
          <Collapsable
            key={group.section}
            defaultOpen={true}
            trigger={(
              <Button flat full content={group.section} />
            )}
            content={group.elements.map((content) => {
              const page = content.replace(/\B(?:([A-Z])(?=[a-z]))|(?:(?<=[a-z0-9])([A-Z]))/g, '-$1$2')
                .toLowerCase();

              return (
                <Button
                  full
                  flat
                  key={page}
                  active={router.pathname === `/components/${page}`}
                  href={`/components/${page}`}
                  className={'element-link'}
                  content={content}
                />
              );
            })}
          />
        ))}
      </div>
    </nav>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
