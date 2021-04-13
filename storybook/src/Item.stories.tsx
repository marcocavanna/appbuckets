import * as React from 'react';

import { Item } from './index';


export default { title: 'Elements/Item', component: Item };

export const baseItem = () => {

  const handleClick = () => null;

  return (
    <Item
      solid
      avatar={{
        icon   : 'user',
        primary: true
      }}
      header={'Titolo dellUtente lunghissimo per vedere cosa capita: Marco Cavanna'}
      content={'info@marcocavanna.com'}
      meta={'Lorem Impsum Dolor Sit Amen'}
      tools={[
        { icon: 'plus', key: 1 },
        { icon: 'trash', key: 2 }
      ]}
      onClick={handleClick}
    />
  );
};


export const itemsGroup = () => {

  const handleClick = () => null;

  return (
    <Item.Group
      items={[
        { avatar: 1, onClick: handleClick, header: 'Item 1', content: 'Item 1 Content', key: 1 },
        { avatar: 2, onClick: handleClick, header: 'Item 1', content: 'Item 1 Content', key: 2 },
        { avatar: 3, onClick: handleClick, header: 'Item 1', content: 'Item 1 Content', key: 3 },
        { avatar: 4, onClick: handleClick, header: 'Item 1', content: 'Item 1 Content', key: 4 }
      ]}
    />
  );
};
