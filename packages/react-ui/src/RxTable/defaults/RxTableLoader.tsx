import * as React from 'react';

import Box from '../../Box';
import Loader from '../../Loader';

import { useRxTable } from '../RxTable.context';


/* --------
 * Component Interfaces
 * -------- */
export interface RxTableLoaderProps {

}


/* --------
 * Component Definition
 * -------- */
const RxTableLoader: React.FunctionComponent<RxTableLoaderProps> = () => {

  // ----
  // Get Loader Props from Context
  // ----
  const { loaderProps } = useRxTable();


  // ----
  // Build the Loader
  // ----
  return (
    <Box py={4}>
      {Loader.create({
        centered: true,
        active  : true,
        size    : 'large',
        type    : 'dots',
        content : 'Loading Data',
        ...loaderProps
      }, {
        autoGenerateKey: false
      })}
    </Box>
  );
};

RxTableLoader.displayName = 'RxTableLoader';

export default RxTableLoader;
