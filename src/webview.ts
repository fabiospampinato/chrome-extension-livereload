
/* IMPORT */

import {getDirectoryHashish, getExtensionDirectory, isDevelopment} from './utils';

/* MAIN */

const livereload = async (): Promise<void> => {

  if ( !await isDevelopment () ) return;

  let directory = await getExtensionDirectory ();
  let hashish = await getDirectoryHashish ( directory );

  let changed = false;
  let intervalMs = 1000;

  const checkLoop = async (): Promise<void> => {

    const hashishNext = await getDirectoryHashish ( directory );

    if ( hashish !== hashishNext ) { // Something changed, waiting for things to settle down

      hashish = hashishNext;
      changed = true;
      intervalMs = 500;

    } else if ( changed ) { // Things settled down, reloading

      window.location.reload ();

    }

    setTimeout ( checkLoop, intervalMs );

  };

  setTimeout ( checkLoop, intervalMs );

};

/* EXPORT */

export default livereload;
