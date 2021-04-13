import * as React from 'react';

import {
  AppBucketsComponentProps,
  ShorthandCollection,
  AppBucketsIcon,
  ElementSize,
  ShorthandItem,
  ShorthandContent
} from '../generic';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';

import { StrictBackdropProps } from '../Backdrop';

import { ModalHeaderProps } from './ModalHeader.types';
import { ModalContentProps } from './ModalContent.types';


export interface ModalProps extends AppBucketsComponentProps<StrictModalProps> {
}

export interface StrictModalProps extends Omit<StrictBackdropProps, 'closeOnDocumentClick' | 'page' | 'visible'> {
  /** Modal Actions Shorthand */
  actions?: ShorthandCollection<ButtonProps>;

  /** Remove all Modal style */
  basic?: boolean;

  /** Children could be component, that receive close modal function */
  children?: ShorthandContent;

  /** Set close icon */
  closeIcon?: AppBucketsIcon<IconProps> | null | false;

  /** Close modal on Backdrop Click */
  closeOnBackdropClick?: boolean;

  /** Modal Content Shorthand */
  content?: ShorthandItem<ModalContentProps>;

  /** Set initial open prop and let it to be auto controlled */
  defaultOpen?: boolean;

  /** Modal Header Shorthand */
  header?: ShorthandItem<ModalHeaderProps>;

  /** A modal Top Icon to show */
  icon?: AppBucketsIcon<IconProps>;

  /** Set modal Mount Node */
  mountNode?: HTMLElement;

  /** When using Actions Shorthand, a global callback could be applied */
  onActionClick?: (e: React.MouseEvent<HTMLElement>, props: ButtonProps) => void;

  /** On Modal Close callback */
  onClose?: (e: React.MouseEvent<HTMLElement>, props: ModalProps) => void;

  /** On Modal Open callback */
  onOpen?: (e: React.MouseEvent<HTMLElement>, props: ModalProps) => void;

  /** Control if Modal is Open or Not */
  open?: boolean;

  /** Set modal Size */
  size?: Exclude<ElementSize, 'extra small' | 'normal'> | 'auto';
}
