import * as React from 'react';
import clsx from 'clsx';

import { useAutoControlledValue, useForkRef } from '@appbuckets/react-ui-core';

import {
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import { useTabIndex } from '../hooks/useTabIndex';

import Icon from '../Icon';
import Field from '../Field';

import { CheckboxProps } from './Checkbox.types';


/* --------
 * Component Render
 * -------- */
const Checkbox: React.VFC<CheckboxProps> = React.forwardRef<HTMLInputElement, CheckboxProps>((
  receivedProps, ref
) => {

  /** Get component props */
  const props = useWithDefaultProps('checkbox', receivedProps);

  const {
    className,
    rest: {
      /** Strict Checkbox Props */
      checked: checkedProp,
      defaultChecked,
      indeterminate,
      radio,
      tabIndex: userDefinedTabIndex,
      type,
      onChecked  : handleChecked,
      onClick    : handleClick,
      onUnchecked: handleUnchecked,
      switch     : asSwitch,

      /** Overridden Checkbox Handlers */

      /** Shared Checkbox/Field Props */
      disabled,
      required,
      readOnly,

      /** Strict Field Props */
      contentClassName,
      hint,
      hintClassName,
      icon,
      iconPosition,
      label,

      /** All other Checkbox props */
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);


  /* --------
   * AutoControlled Checked State
   * -------- */
  const [ checked, trySetChecked ] = useAutoControlledValue(false, { prop: checkedProp, defaultProp: defaultChecked });


  /* --------
   * Internal Component Ref
   * -------- */
  const fieldRef = React.useRef<HTMLDivElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleRef = useForkRef(ref, inputRef);


  /* --------
   * Change Field Classes based on State
   * -------- */
  React.useEffect(
    () => {
      if (!fieldRef.current) {
        return;
      }

      if (checked) {
        fieldRef.current.classList.add('checked');
      }
      else {
        fieldRef.current.classList.remove('checked');
      }
    },
    [ checked, fieldRef ]
  );


  /* --------
   * Component Classes
   * -------- */
  const checkBoxType = radio
    ? 'radio'
    : asSwitch ? 'switch' : 'checkbox';

  const classes = clsx(
    { required, disabled, checked },
    !label && 'unlabeled',
    !checked && indeterminate && 'indeterminate',
    checkBoxType,
    stateClassName,
    className
  );


  /* --------
   * Internal Checkbox Props
   * -------- */
  const canToggle = React.useMemo(
    () => !disabled && !readOnly && !(radio && checked),
    [ disabled, readOnly, radio, checked ]
  );

  const tabIndex = useTabIndex({
    disabled,
    readOnly,
    prop: userDefinedTabIndex
  });


  /* --------
   * Component Handlers
   * -------- */
  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    /** If checkbox could not toggle, return */
    if (!canToggle) {
      return;
    }

    e.stopPropagation();

    /** Build the Handler Params to be reused */
    const changeHandlerParams: [ React.MouseEvent<HTMLLabelElement>, CheckboxProps ] = [
      e,
      { ...props, checked: !checked }
    ];

    /** Call user defined Handlers */
    if (handleClick) {
      handleClick(...changeHandlerParams);
    }

    if (!checked && handleChecked) {
      handleChecked(...changeHandlerParams);
    }
    else if (checked && handleUnchecked) {
      handleUnchecked(...changeHandlerParams);
    }

    /** Try to set the internal auto controlled state */
    trySetChecked(!checked);
  };


  /* --------
   * Memoized Component Element
   * -------- */
  const checkboxIcon = React.useMemo(
    () => {
      if (asSwitch) {
        return null;
      }

      return (
        <Icon
          className={'checkbox-icon'}
          name={radio ? 'circle' : indeterminate ? 'minus' : 'check'}
        />
      );
    },
    [ asSwitch, radio, indeterminate ]
  );

  const labelElement = (
    <label
      htmlFor={rest.id}
      onClick={handleLabelClick}
    >
      {checkboxIcon}
      {label}
    </label>
  );


  /* --------
   * Component Render
   * -------- */
  return (
    <Field
      ref={fieldRef}
      disabled={disabled}
      required={required}
      contentClassName={contentClassName}
      hint={hint}
      hintClassName={hintClassName}
      icon={icon}
      iconPosition={iconPosition}
      readOnly={readOnly}
      appearance={rawRest.appearance}
      danger={rawRest.danger}
      info={rawRest.info}
      primary={rawRest.primary}
      secondary={rawRest.secondary}
      success={rawRest.success}
      warning={rawRest.warning}
      contentType={checkBoxType}
    >
      <input
        {...rest}
        ref={handleRef}
        readOnly
        className={classes}
        disabled={disabled}
        checked={checked}
        tabIndex={tabIndex}
        type={radio ? 'radio' : 'checkbox'}
      />
      {labelElement}
    </Field>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
