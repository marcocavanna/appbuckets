import * as React from 'react';

import { StoryDescriptor } from '../../stories';

import { useCheckboxValue } from '../../hooks/useCheckboxValue';

import { Column, Row } from '../Grid';

import { Checkbox } from '../../elements/Checkbox';
import { Divider } from '../../elements/Divider';

import DropdownMenu from './DropdownMenu';

import { DropdownMenuProps } from './DropdownMenu.types';


export default { title: 'Collections/DropdownMenu' };

function RenderMenu(props?: Partial<DropdownMenuProps>) {
  return (
    <DropdownMenu
      trigger={'Toggle Menu'}
      items={[
        { key: 0, content: 'Vox 1', icon: 'plus' },
        { key: 1, content: 'Vox 2', icon: 'edit' },
        <Divider key={'divider'} />,
        { key: 2, content: 'Vox 3', icon: 'trash' }
      ]}
      {...props}
    />
  );
}

function BaseMenu() {
  return (
    <StoryDescriptor
      header={'Basic Menu'}
      description={(
        <React.Fragment>
          <div>
            Render a basic Dropdown Menu using a trigger generated from a string
          </div>
        </React.Fragment>
      )}
      content={<RenderMenu />}
    />
  );
}

function InvertedMenu() {
  return (
    <StoryDescriptor
      className={'mt-8'}
      header={'Inverted Menu'}
      description={(
        <React.Fragment>
          <p>Menu could be rendered as inverted</p>
        </React.Fragment>
      )}
      content={(
        <RenderMenu
          inverted
        />
      )}
    />
  );
}

function ControlledMenu() {

  const [ open, handleOpenChange ] = useCheckboxValue(false);
  const [ basic, handleBasicChange ] = useCheckboxValue(false);
  const [ inverted, handleInvertedChange ] = useCheckboxValue(false);

  return (
    <StoryDescriptor
      className={'mt-8'}
      header={'Controlled Menu'}
      description={(
        <React.Fragment>
          <p>Open state could be controlled externally</p>
          <p>Also all other props could be controlled</p>
        </React.Fragment>
      )}
      content={(
        <Row>
          <Column>
            <Checkbox checked={open} label={'Open'} onClick={handleOpenChange} />
            <Checkbox label={'Basic'} onClick={handleBasicChange} />
            <Checkbox label={'Inverted'} onClick={handleInvertedChange} />
          </Column>
          <Column>
            <RenderMenu
              position={'bottom left'}
              inverted={inverted}
              basic={basic}
              open={open}
            />
          </Column>
        </Row>
      )}
    />
  );
}

function CustomizedTrigger() {

  const [ withText, handleWithTextChange ] = useCheckboxValue(true);
  const [ withIcon, handleWithIconChange ] = useCheckboxValue(false);
  const [ primary, handlePrimaryChange ] = useCheckboxValue(false);
  const [ rounded, handleRoundedChange ] = useCheckboxValue(false);
  const [ flat, handleFlatChange ] = useCheckboxValue(false);

  return (
    <StoryDescriptor
      className={'mt-8'}
      header={'Customize Trigger'}
      description={(
        <React.Fragment>
          <p>Trigger button could be fully customized using shorthand</p>
        </React.Fragment>
      )}
      content={(
        <Row>
          <Column>
            <Checkbox defaultChecked={withText} label={'With Text'} onClick={handleWithTextChange} />
            <Checkbox label={'With Icon'} onClick={handleWithIconChange} />
            <Checkbox label={'Primary'} onClick={handlePrimaryChange} />
            <Checkbox label={'Rounded'} onClick={handleRoundedChange} />
            <Checkbox label={'Flat'} onClick={handleFlatChange} />
          </Column>
          <Column>
            <RenderMenu
              position={'bottom left'}
              trigger={{
                content: withText ? 'Toggle Menu' : undefined,
                icon   : withIcon ? 'warehouse' : undefined,
                primary,
                rounded,
                flat
              }}
            />
          </Column>
        </Row>
      )}
    />
  );
}

export const dropdown = () => {
  return (
    <React.Fragment>
      <BaseMenu />
      <InvertedMenu />
      <ControlledMenu />
      <CustomizedTrigger />
    </React.Fragment>
  );
};
