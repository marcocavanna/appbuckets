import * as React from 'react';


export interface NoSsrProps extends StrictNoSsrProps {

}

export interface StrictNoSsrProps {
  /** Component content */
  children?: React.ReactNode;

  /** A fallback component to render */
  fallback?: React.ReactNode;
}
