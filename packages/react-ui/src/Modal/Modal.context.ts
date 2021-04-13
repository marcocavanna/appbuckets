import * as React from 'react';

import { contextBuilder } from '../utils';


export type ModalContext = {
  closeModal: (e: React.MouseEvent<HTMLElement>) => void
};


const {
  hook    : useModal,
  Provider: ModalProvider,
  Consumer: ModalConsumer
} = contextBuilder<ModalContext>();

export {
  useModal,
  ModalProvider,
  ModalConsumer
};
