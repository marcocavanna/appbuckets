import * as React from 'react';
import { StoryDescriptor } from '../../stories';

import { Avatar } from './index';


export default { title: 'Elements/Avatar', component: Avatar };


function BaseAvatar() {
  return (
    <StoryDescriptor
      header={'Base Avatar'}
      content={(
        <React.Fragment>
          <Avatar
            className={'mr-4'}
            icon={'briefcase'}
          />
          <Avatar
            className={'mr-4'}
            icon={'user'}
          />
          <Avatar
            content={'MC'}
          />
        </React.Fragment>
      )}
    />
  );
}

function FlatAvatar() {
  return (
    <StoryDescriptor
      className={'mt-8'}
      header={'Flat Avatar'}
      content={(
        <React.Fragment>
          <Avatar
            flat
            className={'mr-4'}
            icon={'briefcase'}
          />
          <Avatar
            flat
            className={'mr-4'}
            icon={'user'}
          />
          <Avatar
            flat
            content={'MC'}
          />
        </React.Fragment>
      )}
    />
  );
}

function AvatarIconVariation() {
  return (
    <StoryDescriptor
      className={'mt-8'}
      header={'Icon Variation'}
      content={(
        <React.Fragment>
          <Avatar
            className={'mr-4'}
            icon={{
              name   : 'briefcase',
              primary: true
            }}
          />
          <Avatar
            className={'mr-4'}
            icon={{
              name  : 'briefcase',
              rotate: 90
            }}
          />
          <Avatar
            icon={{
              name: 'briefcase',
              spin: true
            }}
          />
        </React.Fragment>
      )}
    />
  );
}

function AvatarStyleVariation() {
  return (
    <StoryDescriptor
      className={'mt-8'}
      header={'Avatar Variation'}
      content={(
        <React.Fragment>
          <Avatar
            success
            className={'mr-4'}
            icon={'briefcase'}
          />
          <Avatar
            danger
            className={'mr-4'}
            icon={'user'}
          />
          <Avatar
            warning
            content={'MC'}
          />
        </React.Fragment>
      )}
    />
  );
}

function AvatarBadge() {
  return (
    <StoryDescriptor
      className={'mt-8'}
      header={'Avatar Badge'}
      content={(
        <React.Fragment>
          <Avatar
            badge
            className={'mr-4'}
            icon={'briefcase'}
          />
          <Avatar
            badge={{
              icon   : 'mail-bulk',
              primary: true
            }}
            className={'mr-4'}
            icon={'user'}
          />
          <Avatar
            badge={{
              content: '15'
            }}
            content={'MC'}
          />
        </React.Fragment>
      )}
    />
  );
}

export const baseAvatar = () => {
  return (
    <React.Fragment>
      <BaseAvatar />
      <FlatAvatar />
      <AvatarIconVariation />
      <AvatarStyleVariation />
      <AvatarBadge />
    </React.Fragment>
  );
};
