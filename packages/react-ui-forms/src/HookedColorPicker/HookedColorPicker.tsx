import * as React from 'react';

import ColorPicker, { ColorPickerProps } from '@appbuckets/react-ui/ColorPicker';

import { createHookedField } from '../utils/createHookedField';
import type { HookedFieldProps } from '../utils/createHookedField.types';


export type HookedColorPickerProps = HookedFieldProps<ColorPickerProps>;


/* --------
 * Component Definition
 * -------- */
const HookedColorPicker = createHookedField<ColorPickerProps, null, string | null>({

  displayName: 'HookedColorPicker',

  Component: function HookedColorPickerComponent(props) {

    const {
      meta,
      rest: {
        value,
        ...rest
      }
    } = props;

    return (
      <ColorPicker
        {...rest}
        {...meta.appearance}
        color={value}
        hint={meta.message}
      />
    );
  },

  parseValue: ({ props }) => props?.color || null

});

export default HookedColorPicker;
