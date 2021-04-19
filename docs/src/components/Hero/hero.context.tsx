import * as React from 'react';

import type {
  ButtonProps,
  HeaderContentProps,
  HeaderSubheaderProps,
  IconProps,
  AppBucketsIcon,
  ShorthandCollection,
  ShorthandItem
} from '@appbuckets/react-ui';

import { contextBuilder } from '@appbuckets/react-ui-core';


/* --------
 * Context Definition
 * -------- */
interface HeroState {
  /** Header Actions */
  actions?: ShorthandCollection<ButtonProps>;

  /** The Header Text */
  content?: ShorthandItem<HeaderContentProps>;

  /** Header Actions */
  fabs?: ShorthandCollection<ButtonProps>;

  /** Set icon */
  icon?: AppBucketsIcon<IconProps>;

  /** Header Subheader */
  subheader?: ShorthandItem<HeaderSubheaderProps>;

  /** Should the Hero be visible */
  visible: boolean;
}

interface HeroContext extends HeroState {
  /** Reset and hide Hero */
  resetHero: () => void;

  /** Set the Hero State */
  setHero: (newState: HeroState) => void;
}


/* --------
 * Context Builder
 * -------- */
const {
  hook    : useHero,
  Provider: MasterHeroProvider,
  Consumer: HeroConsumer
} = contextBuilder<HeroContext>();


/* --------
 * Provider Definition
 * -------- */
const HeroProvider: React.FunctionComponent = (props) => {

  const {
    children
  } = props;


  // ----
  // State Management
  // ----
  const [ heroState, setHeroState ] = React.useState<HeroState>({
    fabs     : [],
    content  : undefined,
    icon     : undefined,
    subheader: undefined,
    visible  : false
  });

  const isEffectiveVisible = heroState.visible
    && (
      !!heroState.fabs?.length
      || (heroState.content !== undefined && heroState.content !== null)
      || (heroState.icon !== undefined && heroState.icon !== null)
      || (heroState.subheader !== undefined && heroState.subheader !== null)
    );


  // ----
  // Handlers
  // ----
  const handleResetHero = React.useCallback(
    () => {
      setHeroState({
        fabs     : [],
        content  : undefined,
        icon     : undefined,
        subheader: undefined,
        visible  : false
      });
    },
    []
  );


  // ----
  // Build the Context Object
  // ----
  const heroContext = React.useMemo(
    (): HeroContext => ({
      visible  : isEffectiveVisible,
      resetHero: handleResetHero,
      setHero  : setHeroState,
      fabs     : heroState.fabs,
      content  : heroState.content,
      icon     : heroState.icon,
      subheader: heroState.subheader
    }),
    [
      isEffectiveVisible,
      handleResetHero,
      heroState.content,
      heroState.icon,
      heroState.subheader,
      heroState.fabs
    ]
  );


  // ----
  // Render the Provider and its Children
  // ----
  return (
    <MasterHeroProvider value={heroContext}>
      {children}
    </MasterHeroProvider>
  );
};


/* --------
 * Context Export
 * -------- */
export {
  useHero,
  HeroConsumer,
  HeroProvider
};
