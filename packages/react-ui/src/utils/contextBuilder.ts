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
  hook: () => Context,
  Provider: React.Provider<Context>,
  Consumer: React.Consumer<Context>
};


/* --------
 * Context Builder
 * -------- */
export default function contextBuilder<Context>(
  initialContext?: Context,
  name?: string
): BuiltContext<Context> {
  /** Create the base Context */
  const BaseContext = React.createContext<Context | undefined>(initialContext);

  /** Init the Hook Function */
  function useContextHook(): Context {
    /** Get the value of the context */
    const ctxValue = React.useContext(BaseContext);
    /** Assert value exists */
    invariant(
      ctxValue !== undefined,
      `use${name || 'Context'}() hook must be invoked inside its right Context`
    );
    /** Return the Context */
    return ctxValue;
  }

  /** Return context tools */
  return {
    hook    : useContextHook,
    Provider: BaseContext.Provider as React.Provider<Context>,
    Consumer: BaseContext.Consumer as React.Consumer<Context>
  };
}
