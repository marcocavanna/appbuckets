import * as React from 'react';
import clsx from 'clsx';

import RCSlider from 'rc-slider';

import { useAutoControlledValue } from '@appbuckets/react-ui-core';

import { UIVoidComponent } from '../generic';

import { useField } from '../hooks/useField';
import Popup from '../Popup';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Field from '../Field';

import { SliderProps } from './Slider.types';


/* --------
 * Component Definition
 * -------- */
const Slider: UIVoidComponent<SliderProps> = (receivedProps) => {

  /** Get component props */
  const props = useWithDefaultProps('slider', receivedProps);

  const {
    className,
    rest: {
      /** Strict Slider Props */
      defaultValue  : userDefinedDefaultValue,
      onAfterChange : userDefinedOnAfterChangeHandler,
      onBeforeChange: userDefinedOnBeforeChangeHandler,
      onBlur        : userDefinedOnBlurHandler,
      onChange      : userDefinedOnChangeHandler,
      onFocus       : userDefinedOnFocusHandler,
      tabIndex      : userDefinedTabIndex,
      tooltip,
      value: userDefinedValue,

      /** Ported props */
      draggableTrack,
      dots,
      min,
      marks,
      max,
      step,
      vertical,
      included,
      reverse,
      startPoint,

      /** All other slider props */
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName ] = useSplitStateClassName(rawRest);


  // ----
  // Build Field and Helpers
  // ----
  const {
    fieldRef,
    fieldProps,
    addClassesToField,
    removeClassesFromField,
    ...helpers
  } = useField(rawRest);

  const {
    disabled,
    readOnly,
    required
  } = fieldProps;


  // ----
  // AutoControlled Value State
  // ----
  const [ value, trySetValue ] = useAutoControlledValue(0, {
    prop       : userDefinedValue,
    defaultProp: userDefinedDefaultValue
  });


  // ----
  // Build Component Classes
  // ----
  const classes = clsx(
    {
      required,
      disabled,
      'max-reached': value === max,
      'min-reached': value === min
    },
    stateClassName,
    className
  );


  // ----
  // Internal Props
  // ----
  const canSlide = !disabled && !readOnly;


  // ----
  // Internal Handlers
  // ----
  const handleSliderBeforeChange = () => {
    /** If slider can't move, return */
    if (!canSlide) {
      return;
    }

    /** Set helpers */
    helpers.setFieldClicked();

    /** Call user defined handler if exists */
    if (typeof userDefinedOnBeforeChangeHandler === 'function') {
      userDefinedOnBeforeChangeHandler(null, { ...props, value });
    }
  };

  const handleSliderChange = (newValue: number | number[]) => {
    /** If slider can't move, return */
    if (!canSlide || Array.isArray(newValue)) {
      return;
    }

    /** Call user defined handler */
    if (typeof userDefinedOnChangeHandler === 'function') {
      userDefinedOnChangeHandler(null, { ...props, value: newValue });
    }

    /** Try to set the new value */
    trySetValue(newValue);
  };

  const handleSliderAfterChange = (newValue: number | number[]) => {
    /** If slider can't move, return */
    if (!canSlide || Array.isArray(newValue)) {
      return;
    }

    /** If value has changed, set helpers */
    if (newValue !== value) {
      helpers.setFieldChanged();
    }

    /** Call user defined handler */
    if (typeof userDefinedOnAfterChangeHandler === 'function') {
      userDefinedOnAfterChangeHandler(null, { ...props, value: newValue });
    }

    /** Try to set the new value */
    trySetValue(newValue);
  };

  const handleSliderFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    helpers.setFieldFocused();

    if (typeof userDefinedOnFocusHandler === 'function') {
      userDefinedOnFocusHandler(e, props);
    }
  };

  const handleSliderBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    helpers.setFieldBlurred();

    if (typeof userDefinedOnBlurHandler === 'function') {
      userDefinedOnBlurHandler(e, props);
    }
  };


  // ----
  // Build Component Handler
  // ----
  const handle: SliderProps['handleRender'] = (node, renderProps) => {
    /** If no tooltip exists, return the handler */
    if (!tooltip || renderProps.dragging) {
      return node;
    }

    /** Set tooltip text */
    const tooltipText = typeof tooltip === 'function' ? tooltip(renderProps.value) : value;

    /** Return wrapped handler */
    return (
      <Popup
        content={tooltipText}
        trigger={node}
        updateDependencies={[ renderProps.value ]}
      />
    );
  };


  // ----
  // Component Render
  // ----
  return (
    <Field
      ref={fieldRef}
      {...fieldProps}
      contentType={'slider'}
    >
      <RCSlider
        draggableTrack={draggableTrack}
        dots={dots}
        min={min}
        marks={marks}
        max={max}
        step={step}
        vertical={vertical}
        included={included}
        reverse={reverse}
        startPoint={startPoint}
        className={classes}
        value={value}
        handleRender={handle}
        onAfterChange={handleSliderAfterChange}
        onBeforeChange={handleSliderBeforeChange}
        onBlur={handleSliderBlur}
        onChange={handleSliderChange}
        onFocus={handleSliderFocus}
      />
    </Field>
  );
};

Slider.displayName = 'Slider';

export default Slider;
