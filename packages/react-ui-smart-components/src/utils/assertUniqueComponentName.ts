type Actions = 'confirm' | 'form' | 'selector';

const actionBuilt = new Map<string, Actions>();

export default function assertUniqueComponentName(displayName: string, type: Actions) {
  /** Check components in development mode only */
  if (process.env.NODE_ENV === 'development') {
    /** Get value */
    const maybeType = actionBuilt.get(displayName);
    /** Show a warn if exists */
    if (maybeType) {
      global.console.warn(
        `[ @appbuckets/react-ui-smart-components ] : a ${maybeType} component has been `
        + `already built using displayName ${displayName}.`
      );
    }
    /** Add the value */
    else {
      actionBuilt.set(displayName, type);
    }
  }
}
