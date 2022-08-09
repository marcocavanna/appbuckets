import * as React from 'react';
import clsx from 'clsx';

import { useAutoControlledValue, useForkRef } from '@appbuckets/react-ui-core';

import ReactInputMask from 'react-input-mask';
import TextareaAutosize from 'react-textarea-autosize';

import { useSharedClassName, useSplitStateClassName } from '../utils';

import { useTabIndex } from '../hooks/useTabIndex';

import { useWithDefaultProps } from '../BucketTheme';

import Field from '../Field';

import { InputProps } from './Input.types';


/* --------
 * Component Render
 * -------- */
const Input: React.VoidFunctionComponent<InputProps> = React.forwardRef<HTMLInputElement, InputProps>((
  receivedProps, ref
) => {

  const props = useWithDefaultProps('input', receivedProps);

  const {
    className,
    rest: {
      /** Strict Input Props */
      clearable,
      masked,
      textarea,
      type,
      tabIndex: userDefinedTabIndex,
      selectAllOnClick,
      value       : userDefinedValue,
      defaultValue: userDefinedDefaultValue,
      textareaProps,

      /** Overridden Input Handlers */
      onClick      : userDefinedOnClick,
      onClear      : userDefinedOnClear,
      onChange     : userDefinedOnChange,
      onBlur       : userDefinedOnBlur,
      onFocus      : userDefinedOnFocus,
      onInputSubmit: userDefinedOnSubmit,
      onKeyDown    : userDefinedOnKeyDown,

      /** Shared Input/Field Props */
      disabled,
      required,
      readOnly,

      /** Strict Field Props */
      actions,
      actionsPosition,
      contentClassName,
      hint,
      hintClassName,
      icon,
      iconPosition,
      label,

      /** All other input Props */
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ stateClassName, rest ] = useSplitStateClassName(rawRest);


  /* --------
   * Auto Controlled Component Value
   * -------- */
  const [ value, trySetValue ] = useAutoControlledValue('', {
    prop       : userDefinedValue,
    defaultProp: userDefinedDefaultValue
  });


  /* --------
   * Internal Component Ref
   * -------- */
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleRef = useForkRef(ref, inputRef);


  /* --------
   * Component Classes
   * -------- */
  const classes = clsx(
    { required, disabled, clearable },
    'text',
    stateClassName,
    className
  );


  /* --------
   * Class list Controller
   * -------- */
  const addClassesToRef = React.useCallback(
    (...classesToAdd: string[]) => {
      classesToAdd.forEach((cx) => {
        if (fieldRef.current) {
          fieldRef.current.classList.add(cx);
        }

        if (inputRef.current) {
          inputRef.current.classList.add(cx);
        }
      });
    },
    []
  );

  const removeClassesFromRef = React.useCallback(
    (...classesToRemove: string[]) => {
      classesToRemove.forEach((cx) => {
        if (fieldRef.current) {
          fieldRef.current.classList.remove(cx);
        }

        if (inputRef.current) {
          inputRef.current.classList.remove(cx);
        }
      });
    },
    []
  );


  /* --------
   * Input Handlers
   * -------- */
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Remove classes from reference */
    removeClassesFromRef('focused');

    /** Call user defined handler */
    if (userDefinedOnBlur) {
      userDefinedOnBlur(e, { ...props, value });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /** Add class to reference */
    addClassesToRef('dirty');


    /** Call user defined handler */
    if (userDefinedOnChange) {
      userDefinedOnChange(e, {
        ...props,
        value: e.target.value
      });
    }

    /** Try to change local input state value */
    trySetValue(e.target.value);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Add classes to reference */
    addClassesToRef('touched');

    if (inputRef.current && selectAllOnClick) {
      inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    }

    e.stopPropagation();

    if (userDefinedOnClick) {
      userDefinedOnClick(e, { ...props, value });
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Add classes to reference */
    addClassesToRef('touched', 'focused');

    /** Call user defined handler */
    if (userDefinedOnFocus) {
      userDefinedOnFocus(e, { ...props, value });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    /** Abort if Disabled or Readonly */
    if (disabled || readOnly) {
      return;
    }

    /** Call user defined handler */
    if (userDefinedOnKeyDown) {
      userDefinedOnKeyDown(e);
    }

    /** If enter has been pressed */
    if ((e.key === 'Enter' || e.key === 'NumpadEnter') && userDefinedOnSubmit) {
      userDefinedOnSubmit(null, { ...props, value });
    }
  };

  const handleInputClear = React.useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      /** Manually set the input value, and after trigger the change event */
      if (inputRef.current) {
        /** Get the right value setter function from element */
        const valueSetter = Object.getOwnPropertyDescriptor(inputRef.current, 'value')?.set;
        const prototype = Object.getPrototypeOf(inputRef.current);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

        /** Create the Event */
        const event = new Event('input', { bubbles: true });
        (event as any).simulated = true;

        /** Call the Value Setter Function */
        if (valueSetter !== prototypeValueSetter && prototypeValueSetter) {
          prototypeValueSetter.call(inputRef.current, '');
        }
        else if (valueSetter) {
          valueSetter.call(inputRef.current, '');
        }

        /** Dispatch the event */
        inputRef.current.dispatchEvent(event);

        /** Call user defined handler */
        if (userDefinedOnClear) {
          userDefinedOnClear(e);
        }

        /** Focus the input element */
        inputRef.current.focus();
      }
    },
    [ userDefinedOnClear ]
  );

  /* --------
   * Input Computed Properties
   * -------- */
  const tabIndex = useTabIndex({
    disabled,
    readOnly,
    prop: userDefinedTabIndex
  });


  /* --------
   * Input Render
   * -------- */
  const renderInputElement = () => {
    const baseProps: any = {
      value,
      disabled,
      required,
      tabIndex,
      readOnly,
      className   : classes,
      autoComplete: 'off',
      type        : type || 'text',
      onBlur      : handleInputBlur,
      onChange    : handleInputChange,
      onClick     : handleInputClick,
      onFocus     : handleInputFocus,
      onKeyDown   : handleInputKeyDown
    };

    if (masked) {
      return (
        <ReactInputMask
          {...baseProps}
          {...masked}
        >
          {(inputProps: any) => {
            const {
              maskPlaceholder,
              ...restInputProps
            } = inputProps;

            return (
              <input
                {...restInputProps}
                {...rest}
                ref={handleRef}
                {...baseProps}
              />
            );
          }}
        </ReactInputMask>
      );
    }

    if (textarea) {
      return (
        <TextareaAutosize
          {...rest}
          ref={handleRef}
          {...textareaProps}
          {...baseProps}
        />
      );
    }

    return (
      <input
        {...rest}
        ref={handleRef}
        {...baseProps}
      />
    );
  };


  /* --------
   * Component Render
   * -------- */
  return (
    <Field
      ref={fieldRef}
      disabled={disabled}
      required={required}
      actions={actions}
      actionsPosition={actionsPosition}
      contentClassName={contentClassName}
      hint={hint}
      hintClassName={hintClassName}
      icon={icon}
      iconPosition={iconPosition}
      label={label}
      readOnly={readOnly}
      clearable={clearable}
      onClear={handleInputClear}
      appearance={rawRest.appearance}
      danger={rawRest.danger}
      info={rawRest.info}
      primary={rawRest.primary}
      secondary={rawRest.secondary}
      success={rawRest.success}
      warning={rawRest.warning}
      contentType={'input'}
    >
      {renderInputElement()}
    </Field>
  );
});

Input.displayName = 'Input';

export default Input;
