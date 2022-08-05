import * as React from 'react';
import clsx from 'clsx';

import {
  createShorthandFactory,
  useAutoControlledValue,
  useForkRef
} from '@appbuckets/react-ui-core';

import { Creatable } from '../generic';

import { useField } from '../hooks/useField';

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
const Checkbox: Creatable<React.VoidFunctionComponent<CheckboxProps>> = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
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

        /** All other Checkbox props */
        ...rawRest
      }
    } = useSharedClassName(props);

    const [ stateClassName ] = useSplitStateClassName(rawRest);

    // ----
    // Build field and Helpers
    // ----
    const {
      fieldRef,
      fieldProps: { label, ...fieldProps },
      rest,
      addClassesToField,
      removeClassesFromField,
      ...helpers
    } = useField(rawRest);

    const {
      disabled,
      readOnly,
      required
    } = fieldProps;

    /* --------
     * AutoControlled Checked State
     * -------- */
    const [ checked, trySetChecked ] = useAutoControlledValue(false, {
      prop       : checkedProp,
      defaultProp: defaultChecked
    });


    /* --------
     * Internal Component Ref
     * -------- */
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleRef = useForkRef(ref, inputRef);


    /* --------
     * Change Field Classes based on State
     * -------- */
    React.useEffect(
      () => {
        if (checked) {
          addClassesToField('checked');
        }
        else {
          removeClassesFromField('checked');
        }
      },
      [ checked, addClassesToField, removeClassesFromField ]
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
    const canToggle = !disabled && !readOnly && !(radio && checked);

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

      /** Set field as touched and dirty */
      helpers.setFieldClicked();
      helpers.setFieldChanged();

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
        <div className={'checkbox-toggle'}>
          {checkboxIcon}
        </div>
        {label && (
          <span>{label}</span>
        )}
      </label>
    );


    /* --------
     * Component Render
     * -------- */
    return (
      <Field
        ref={fieldRef}
        {...fieldProps}
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
  }) as any as Creatable<React.VoidFunctionComponent<CheckboxProps>>;

Checkbox.displayName = 'Checkbox';

Checkbox.create = createShorthandFactory(
  Checkbox,
  (label) => (
    { label }
  )
);

export default Checkbox;
