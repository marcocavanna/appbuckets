import { AnyObject, Subtract } from '../generic';

import { StrictFieldProps } from '../Field';


const fieldPropsKey: ReadonlyArray<keyof StrictFieldProps> = [
  'actions',
  'actionsPosition',
  'appearance',
  'clearable',
  'contentClassName',
  'contentType',
  'disabled',
  'hint',
  'hintClassName',
  'icon',
  'iconPosition',
  'isDirty',
  'isFocused',
  'isTouched',
  'label',
  'onClear',
  'readOnly',
  'required',
  'appearance',
  'danger',
  'info',
  'primary',
  'secondary',
  'success',
  'warning'
];


export default function splitFieldProps<P extends StrictFieldProps & AnyObject>(
  props: P
) {

  const fieldProps: StrictFieldProps = {};
  const rest = {} as Subtract<P, StrictFieldProps>;

  Object.keys(props).forEach((propKey) => {
    if (fieldPropsKey.includes(propKey as any)) {
      // @ts-ignore
      fieldProps[propKey as keyof StrictFieldProps] = props[propKey];
    }
    else {
      rest[propKey as keyof Subtract<P, StrictFieldProps>] = props[propKey];
    }
  });

  return [
    fieldProps,
    rest
  ] as const;
}
