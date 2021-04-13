import * as React from 'react';
import ColorPickerComponent from './ColorPicker';


export default { title: 'Elements/Color Picker', component: ColorPickerComponent };


export const ColorPicker = () => {
  return (
    <ColorPickerComponent
      color={'#D9E3F0'}
      label={'Color'}
      placeholder={'Choose Color'}
    />
  );
};
