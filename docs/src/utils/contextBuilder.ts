import * as React from 'react';
import invariant from 'tiny-invariant';


/* --------
 * Interface and Types Definition
 * -------- */
export type ProviderProps<Context> = {
  initialState?: Context;
  children: React.ReactNode
};


export type ConsumerProps<Context> = {
  children: (props: Context) => React.ReactNode
};


export type BuiltContext<Context> = {
  hook: () => Exclude<Context, null>,
  Provider: React.Provider<Context>,
  Consumer: React.Consumer<Context>
};


/* --------
 * Context Builder
 * -------- */
export function contextBuilder<Context>(
  initialContext?: Context
): BuiltContext<Context> {
  /** Create the base Context */
  const BaseContext = React.createContext<Context | undefined>(initialContext);

  /** Init the Hook Function */
  function useContextHook(): Exclude<Context, null> {
    /** Get the value of the context */
    const ctxValue = React.useContext(BaseContext);
    /** Assert value exists */
    invariant(
      ctxValue !== undefined && ctxValue !== null,
      'useContext() hook must be invoked inside its right Context'
    );
    /** Return the Context */
    return ctxValue as any;
  }

  /** Return context tools */
  return {
    hook    : useContextHook,
    Provider: BaseContext.Provider as React.Provider<Context>,
    Consumer: BaseContext.Consumer as React.Consumer<Context>
  };
}
