import * as React from 'react';
import Dropzone from './Dropzone';


export default { title: 'Modules/Dropzone', component: Dropzone };

export const dropzone = () => {

  const handleUpload = () => new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  });

  return (
    <Dropzone
      onUpload={Dropzone.processFileUpload(handleUpload, { concurrency: 1 })}
    />
  );
};
