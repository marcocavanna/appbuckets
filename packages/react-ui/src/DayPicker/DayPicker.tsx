import * as React from 'react';
import clsx from 'clsx';

import { useAutoControlledValue } from '@appbuckets/react-ui-core';

import { DayModifiers } from 'react-day-picker';
import ReactDayPicker from 'react-day-picker/DayPicker';

import {
  splitFieldProps,
  useSharedClassName,
  useSplitStateClassName
} from '../utils';

import { useWithDefaultProps } from '../BucketTheme';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import Popup from '../Popup';

import type { InputProps } from '../Input';
import type { ModalStateChangeHandler } from '../Modal';

import { DayPickerProps, ParsableDate } from './DayPicker.types';


/* --------
 * Component Render
 * -------- */
const DayPicker: React.VoidFunctionComponent<DayPickerProps> = (receivedProps) => {

  /** Get component default props */
  const props = useWithDefaultProps('dayPicker', receivedProps);

  const {
    className,
    rest: {
      /** Strict DayPicker Props */
      clearable,
      clearButton,
      closeOnDayPicked,
      date: userDefinedDate,
      defaultDate,
      defaultOpen,
      format,
      onCalendarClose,
      onCalendarOpen,
      onDayChange,
      onInputChange,
      open: userDefinedOpen,
      parse,
      showInputMask,
      trigger,
      triggerProps,
      type,

      /** Shared Field Props */
      disabled,
      readOnly,
      required,

      /** Strict DayPicker Props */
      fixedWeeks: userDefinedFixedWeeks,
      onTodayButtonClick,
      todayButton,

      /** Strip useless props */
      ref,

      /** All other DayPicker Props Props */
      ...rawRest
    }
  } = useSharedClassName(props);

  const [ , allRest, inputState ] = useSplitStateClassName(rawRest);
  const [ restFieldProps, restDayPickerProps ] = splitFieldProps(allRest);


  /* --------
   * Auto Controlled Component State
   * -------- */
  const [ rawDate, trySetRawDate ] = useAutoControlledValue(null, {
    prop       : userDefinedDate,
    defaultProp: defaultDate
  });

  const [ open, trySetOpen ] = useAutoControlledValue(false, {
    prop       : userDefinedOpen,
    defaultProp: defaultOpen
  });


  /* --------
   * Internal Function
   * -------- */
  const getToday = React.useCallback(
    (): Date => {
      const newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    },
    []
  );


  /* --------
   * Date Parsing and Formatting
   * -------- */
  const castToDate = React.useCallback(
    (date: ParsableDate): Date | null => {
      /** If no date, return null */
      if (!date) {
        return null;
      }

      /** Initialize the Casted Date variable */
      let castedDate: Date | null;

      /** If a custom parse function exists, use to cast the date */
      if (typeof parse === 'function') {
        castedDate = parse(date);
      }
      /** Else, if is a valid date, use as is */
      else if (date instanceof Date) {
        castedDate = date;
      }
      /** Use the date constructor if rawDate is a primitive type */
      else {
        castedDate = new Date(date);
      }

      /** If casted date is invalid, return null */
      if (castedDate === null || !((castedDate as Date | null) instanceof Date) || castedDate?.toString() === 'Invalid Date') {
        return null;
      }

      /** Set Hours */
      castedDate.setHours(0, 0, 0, 0);

      return castedDate;
    },
    [ parse ]
  );

  const formatDate = React.useCallback(
    (date: Date | null): string => {
      /** If no date, return an empty string */
      if (!date || date.toString() === 'Invalid Date') {
        return '';
      }

      /** If a custom format function exists, use it */
      if (typeof format === 'function') {
        return format(date);
      }

      return date.toLocaleDateString();
    },
    [ format ]
  );

  const selectedDate = React.useMemo<{ object: Date | null, formatted: string }>(
    () => {
      /** If no raw date exists, set as null */
      if (rawDate === null || rawDate === undefined) {
        return { object: null, formatted: '' };
      }

      /** Initialize the casted date variable, and formatted one */
      const castedDate = castToDate(rawDate);

      /** Return data */
      return {
        object   : castedDate,
        formatted: formatDate(castedDate)
      };
    },
    [
      castToDate,
      formatDate,
      rawDate
    ]
  );

  const [ inputValue, setInputValue ] = React.useState(selectedDate.formatted ?? '');


  /* --------
   * Build Props Object used to pass to Event
   * -------- */
  const propsForEvent: DayPickerProps = {
    ...props,
    date     : selectedDate.object ?? null,
    timestamp: selectedDate.object?.valueOf() ?? null
  };


  /* --------
   * Component Handlers
   * -------- */
  const handleCalendarOpen = () => {
    if (onCalendarOpen) {
      onCalendarOpen(null, propsForEvent);
    }
    trySetOpen(true);
  };

  const handleCalendarClose = () => {
    if (onCalendarClose) {
      onCalendarClose(null, propsForEvent);
    }
    trySetOpen(false);
  };

  const handleCalendarModalClose: ModalStateChangeHandler = (e) => {
    /** Stop event Propagation */
    e.stopPropagation();

    /** Close the Calendar */
    handleCalendarClose();
  };

  const evalDayChange = (value: string | Date, triggeredByInput: boolean) => {
    /** Build new Date Object */
    const newDate = castToDate(value);
    const currTimestamp = selectedDate.object?.valueOf() ?? null;

    const isValidNewDate = newDate && newDate.toString() !== 'Invalid Date';

    const newDateObject = isValidNewDate ? newDate as Date : null;
    const newTimestamp = isValidNewDate ? (newDate as Date).valueOf() : null;

    /** Check if date is changed */
    if (currTimestamp !== newTimestamp && onDayChange) {
      onDayChange(null, {
        ...propsForEvent,
        date     : newDate,
        timestamp: newTimestamp
      });
    }

    if (closeOnDayPicked) {
      handleCalendarClose();
    }

    if (!triggeredByInput) {
      setInputValue(formatDate(newDate));
    }

    trySetRawDate(newDateObject);
  };

  const handleDayClick = (day: Date, modifiers: DayModifiers, e: React.MouseEvent) => {
    /** If calendar is disabled, or day is disabled, return */
    if (disabled || modifiers.disabled) {
      return;
    }
    /** Stop event Propagation */
    e.stopPropagation();
    /** Eval Day Change */
    evalDayChange(day, false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, inputProps: InputProps) => {
    /** Change Input Value */
    setInputValue(inputProps.value!);
    /** Trigger Handler */
    if (onInputChange) {
      onInputChange(e, inputProps);
    }
    /** Eval day Change */
    evalDayChange(inputProps.value!, true);
  };

  const handleTodayButtonClick = () => {
    evalDayChange(getToday(), false);
  };

  const handleClearDate = () => {
    evalDayChange('', false);
  };


  /** Build the element class list */
  const classes = clsx(
    'day-picker',
    className
  );


  /* --------
   * Build the Modal Trigger Memoized Element
   * -------- */
  const modalTrigger = (() => {
    if (type === 'input') {
      return undefined;
    }

    if (trigger) {
      return trigger;
    }

    return (
      <Button
        icon={'calendar'}
        content={selectedDate.formatted}
        {...triggerProps}
        disabled={disabled}
        onClick={handleCalendarOpen}
      />
    );
  })();

  const calendarAddon = (() => {
    /** In Portal no addons could be defined */
    if (type === 'input') {
      return null;
    }

    /** Build clear Button */
    const clearButtonElement = clearable && !!rawDate && Button.create(clearButton || 'Clear', {
      autoGenerateKey: false,
      defaultProps   : {
        size: 'small'
      },
      overrideProps  : {
        className: 'clear',
        disabled,
        onClick  : handleClearDate
      }
    });

    /** Build today button */
    const todayButtonElement = Button.create(todayButton, {
      autoGenerateKey: false,
      defaultProps   : {
        primary: true,
        size   : 'small'
      },
      overrideProps  : {
        className: 'today',
        disabled,
        onClick  : handleTodayButtonClick
      }
    });

    /** If no content, return */
    if (!clearButtonElement && !todayButtonElement) {
      return null;
    }

    return (
      <div className={'addons'}>
        {todayButtonElement}
        {clearButtonElement}
      </div>
    );
  })();


  /* --------
   * Build the DayPicker Component
   * -------- */
  const dayPickerElement = (
    <React.Fragment>
      <ReactDayPicker
        // Component Props
        {...restDayPickerProps}
        fixedWeeks={userDefinedFixedWeeks ?? type === 'modal'}
        // Selected Days
        month={selectedDate.object || undefined}
        selectedDays={selectedDate.object || undefined}
        // Handlers
        onDayClick={handleDayClick}
        onTodayButtonClick={handleDayClick}
      />
      {calendarAddon}
    </React.Fragment>
  );


  /* --------
   * Return the Calendar as Input
   * -------- */
  if (type === 'input') {
    return (
      <Popup
        portalProps={{
          open
        }}
        onOpen={handleCalendarOpen}
        onClose={handleCalendarClose}
        basic={false}
        inverted={false}
        position={'bottom left'}
        openOn={[ 'focus' ]}
        trigger={(
          <Input
            {...inputState}
            {...restFieldProps}
            className={classes}
            clearable={clearable && !!rawDate}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
      >
        {dayPickerElement}
      </Popup>
    );
  }

  return (
    <Modal
      className={classes}
      open={open}
      trigger={modalTrigger}
      content={dayPickerElement}
      onClose={handleCalendarModalClose}
    />
  );
};

DayPicker.displayName = 'DayPicker';

export default DayPicker;
