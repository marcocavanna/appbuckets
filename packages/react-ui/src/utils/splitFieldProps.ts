import { AnyObject } from '../generic';

import { StrictFieldProps } from '../Field';


const fieldPropsKey: ReadonlyArray<keyof StrictFieldProps> = [
  'actions',
  'actionsPosition',
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


// type Rest<P> = Omit<P, Exclude<keyof P, keyof StrictFieldProps>>;
type Rest<P> = {
  [K in keyof P]: K extends keyof StrictFieldProps ? never : P[K]
};

export default function splitFieldProps<P extends StrictFieldProps & AnyObject>(
  props: P
) {

  const fieldProps: StrictFieldProps = {};
  const rest = {} as Rest<P>;

  Object.keys(props).forEach((propKey) => {
    if (fieldPropsKey.includes(propKey as any)) {
      fieldProps[propKey as keyof StrictFieldProps] = props[propKey];
    }
    else {
      rest[propKey as keyof Rest<P>] = props[propKey];
    }
  });

  return [
    fieldProps,
    rest
  ] as const;
}
